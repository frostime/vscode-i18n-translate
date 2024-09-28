/*
 * Copyright (c) 2024 by frostime. All Rights Reserved.
 * @Author       : frostime
 * @Date         : 2024-09-28 13:25:56
 * @FilePath     : /src/extension.ts
 * @LastEditTime : 2024-09-28 14:03:48
 * @Description  : 
 */
import * as vscode from 'vscode';

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
		let disposable = vscode.commands.registerCommand('extension.translateI18n', () => {
			this.translateI18n();
		});

		context.subscriptions.push(disposable);
	}

	private async translateI18n() {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage('未找到活动的编辑器');
			return;
		}

		const document = editor.document;
		const fileInfo = this.fileHandler.getFileInfo(document);

		if (!fileInfo) {
			return;
		}

		vscode.window.showInformationMessage(`开始翻译，目标: ${this.configManager.getToLangs().join(', ')}`);

		for (const toLang of this.configManager.getToLangs()) {
			try {
				console.debug(`开始翻译 ${fileInfo.name} 到 ${toLang}`);
				const translatedText = await this.translationService.translateContent(fileInfo.content, toLang, fileInfo.name);
				const newFilePath = this.fileHandler.createTranslatedFile(fileInfo.dir, toLang, fileInfo.ext);
				this.fileHandler.writeFile(newFilePath, translatedText);
				vscode.window.showInformationMessage(`翻译到 ${toLang} 完成`);
				console.debug(`输出到 ${newFilePath}:`);
				console.debug(`${translatedText}\n\n`);
			} catch (error) {
				vscode.window.showErrorMessage(`翻译到 ${toLang} 时出错: ${error}`);
				console.error(error);
			}
		}
	}
}

export function activate(context: vscode.ExtensionContext) {
	const extension = new I18nTranslationExtension();
	extension.activate(context);
}

export function deactivate() { }
