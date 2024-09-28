/*
 * Copyright (c) 2024 by frostime. All Rights Reserved.
 * @Author       : frostime
 * @Date         : 2024-09-28 13:30:49
 * @FilePath     : /src/config.ts
 * @LastEditTime : 2024-09-28 14:20:27
 * @Description  : 
 */
import * as vscode from 'vscode';

export interface I18nConfig {
    'GPT.endpoint': string;
    'GPT.key': string;
    'GPT.model': string;
    prompt: string;
    toLangs: string[];
}

const DEFAULT_PROMPT = {
    zh_CN: `## 任务描述

- 任务: 请将 i18n 文件 {i18nFile} 的内容（见[## i18n 文本]）翻译为别的语言
- 要求: 
    - 翻译目标语言为: {toLang}
    - 将[## i18n 文本]翻译之后的结果直接输出，注意要保留源格式
- 词汇表:
    - empty

## i18n 文本

{content}`,
    en_US: `## Task Description

- Task: Please translate the content of the i18n file {i18nFile} (see [## i18n Text])
- Requirements:
  - Target language for translation: {toLang}
  - Output the translated result of [## i18n Text] directly, making sure to preserve the source format
- Dictionary:
  - empty

## i18n Text

{content}`
};


export class ConfigManager {
    public getCurrentLanguage(): string {
        return vscode.env.language;
    }

    private getConfig(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration('i18nTranslation');
    }

    public getGptEndpoint(): string {
        return this.getConfig().get('GPT.endpoint', 'https://api.openai.com/v1/chat/completions');
    }

    public getGptKey(): string {
        return this.getConfig().get('GPT.key', '');
    }

    public getGptModel(): string {
        return this.getConfig().get('GPT.model', 'gpt-4o-mini');
    }

    public getPrompt(): string {
        const currentLang = this.getCurrentLanguage();
        const config = vscode.workspace.getConfiguration('i18nTranslation');
        const customPrompt = config.get<string>('prompt');

        if (customPrompt) {
            return customPrompt;
        }

        return currentLang.startsWith('zh') ? DEFAULT_PROMPT.zh_CN : DEFAULT_PROMPT.en_US;
    }

    public getToLangs(): string[] {
        return this.getConfig().get('toLangs', ['en_US']);
    }
}
