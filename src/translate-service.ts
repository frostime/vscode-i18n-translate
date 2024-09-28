import axios from 'axios';
import { ConfigManager } from './config';

export class TranslationService {
    private configManager: ConfigManager;

    constructor(configManager: ConfigManager) {
        this.configManager = configManager;
    }

    public async translateContent(content: string, toLang: string, fileName: string): Promise<string> {
        const prompt = this.configManager.getPrompt()
            .replace('{i18nFile}', fileName)
            .replace('{toLang}', toLang)
            .replace('{content}', content);

        const response = await axios.post(
            this.configManager.getGptEndpoint(),
            {
                model: this.configManager.getGptModel(),
                messages: [{ role: 'user', content: prompt }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${this.configManager.getGptKey()}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        let translation = response.data.choices[0].message.content;
        return this.postProcessTranslation(translation);
    }

    /**
     * 后处理翻译结果
     * 
     * 主要需要检查一下翻译结果是否被包裹在 ``` 的代码块中，如果是的话，需要去掉
     * 
     * 例如
     * ```json
     * ...
     * ```
     * 
     * @param translation 
     */
    public postProcessTranslation(translation: string): string {
        translation = translation.trim();
        if (translation.endsWith('```')) {
            translation = translation.substring(0, translation.length - 3).trim();
        }

        //开头 ```(lang?)
        const regex = /^```(\w+)?/;
        const match = regex.exec(translation);
        if (match) {
            translation = translation.replace(regex, '');
        }

        return translation;
    }
}