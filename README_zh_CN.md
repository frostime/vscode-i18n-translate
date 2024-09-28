# i18n-translation

一个基于 GPT API 的 Visual Studio Code i18n 翻译扩展。

## 特性

- 使用 GPT API 翻译 i18n 文件（JSON YAML 等文件）
- 支持多个目标语言
- 可自定义翻译提示模板
- 在 VSCode 中易于使用的命令

## 要求

- Visual Studio Code ^1.93.0
- GPT API 密钥

## 扩展设置

此扩展提供以下设置：

* `i18nTranslation.GPT.endpoint`: GPT API 端点 URL
* `i18nTranslation.GPT.key`: GPT API 密钥
* `i18nTranslation.GPT.model`: GPT API 模型名称
* `i18nTranslation.prompt`: i18n 翻译的提示模板
* `i18nTranslation.toLangs`: 翻译目标语言

## 使用方法

1. 在 VSCode 中打开一个 i18n 文件（JSON 或 YAML）
2. 按下 `Ctrl+Shift+P`（在 macOS 上为 `Cmd+Shift+P`）打开命令面板
3. 输入 "i18n-translation: Translate I18n" 并选择它
4. 扩展将把文件内容翻译成指定的目标语言，并写入到同目录下的相应文件中

## 已知问题

请在 [GitHub 仓库](https://github.com/yourusername/i18n-translation/issues) 上报告任何问题。
