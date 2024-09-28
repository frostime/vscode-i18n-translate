/*
 * Copyright (c) 2024 by frostime. All Rights Reserved.
 * @Author       : frostime
 * @Date         : 2024-09-28 13:25:56
 * @FilePath     : /src/extension.ts
 * @LastEditTime : 2024-09-28 17:51:37
 * @Description  : 
 */
import * as vscode from 'vscode';

import yaml from 'js-yaml';
import { createInterfacesFromObject } from 'typescript-interface-generator'

import { ConfigManager } from './config';
import { TranslationService } from './translate-service';
import { FileHandler } from './file-handler';

export class I18nTranslationExtension {
	private configManager: ConfigManager;
	private translationService: TranslationService;
	private fileHandler: FileHandler;

	constructor() {
		this.configManager = new ConfigManager();
		this.translationService = new TranslationService(this.configManager);
		this.fileHandler = new FileHandler();
	}

	public activate(context: vscode.ExtensionContext) {
		const disposable = vscode.commands.registerCommand('extension.translateI18n', () => {
			this.translateI18n();
		});

		context.subscriptions.push(disposable);

		const disposable2 = vscode.commands.registerCommand('extension.convertI18nToTs', () => {
			this.convertI18nToTs();
		});

		context.subscriptions.push(disposable2);
	}

	private useCurrentDocument() {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage('Active editor not found');
			return;
		}

		const document = editor.document;
		const fileInfo = this.fileHandler.getFileInfo(document);

		if (!fileInfo) {
			return;
		}

		return fileInfo;
	}

	private async translateI18n() {
		const fileInfo = this.useCurrentDocument();

		if (!fileInfo) {
			return;
		}

		vscode.window.showInformationMessage(`Start translating: ${this.configManager.getToLangs().join(', ')}`);

		for (const toLang of this.configManager.getToLangs()) {
			try {
				console.debug(`开始翻译 ${fileInfo.name} 到 ${toLang}`);
				const translatedText = await this.translationService.translateContent(fileInfo.content, toLang, fileInfo.name);
				const newFilePath = this.fileHandler.createTranslatedFile(fileInfo.dir, toLang, fileInfo.ext);
				this.fileHandler.writeFile(newFilePath, translatedText);
				vscode.window.showInformationMessage(`Translated to ${toLang} done!`);
				console.debug(`输出到 ${newFilePath}:`);
				console.debug(`${translatedText}\n\n`);
			} catch (error) {
				vscode.window.showErrorMessage(`Translated ${toLang} error: ${error}`);
				console.error(error);
			}
		}
	}

	/**
	 * 将当前的 i18n 文件转换为 TypeScript 的 interface 定义
	 * - 读取当前的 i18n 文件
	 * - 将内容转换为 TypeScript 的 interface 定义
	 * - 输出到指定目录
	 */
	private async convertI18nToTs() {
		const fileInfo = this.useCurrentDocument();

		if (!fileInfo) {
			return;
		}

		const content = fileInfo.content;
		let i18nObject = null;
		if (fileInfo.ext === '.json') {
			i18nObject = JSON.parse(content);
		} else if (fileInfo.ext === '.yaml' || fileInfo.ext === '.yml') {
			i18nObject = yaml.load(content);
		} else {
			vscode.window.showErrorMessage('Must be a JSON or YAML file');
			return;
		}

		// Convert to TypeScript interface
		let tsContent = '';
		try {
			tsContent = createInterfacesFromObject('I18n', i18nObject);
		} catch (error) {
			vscode.window.showErrorMessage(`Convert to TypeScript interface error: ${error}`);
			console.error(error);
			return;
		}

		// 获取工作目录
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		const defaultUri = workspaceFolder
			? vscode.Uri.joinPath(workspaceFolder.uri, 'i18n.d.ts')
			: vscode.Uri.file(fileInfo.dir);

		// vscode 选择输出文件
		const outputUri = await vscode.window.showSaveDialog({
			defaultUri: defaultUri,
			saveLabel: 'Write to',
			filters: {
				'TypeScript': ['d.ts'],
			},
		});

		if (!outputUri) {
			return;
		}

		this.fileHandler.writeFile(outputUri.fsPath, tsContent);
		vscode.window.showInformationMessage('Write to i18n.d.ts successfully');

	}
}

export function activate(context: vscode.ExtensionContext) {
	const extension = new I18nTranslationExtension();
	extension.activate(context);
}

export function deactivate() { }
