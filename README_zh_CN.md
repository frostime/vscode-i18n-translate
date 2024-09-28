# i18n-translation

一个基于 GPT API 的 Visual Studio Code i18n 翻译扩展。

## 特性

- 使用 GPT API 翻译 i18n 文件（JSON YAML 等文件）
- 支持多个目标语言
- 可自定义翻译提示模板
- 在 VSCode 中易于使用的命令

## 扩展设置

此扩展提供以下设置：

* `i18nTranslation.GPT.endpoint`: GPT API 端点 URL
* `i18nTranslation.GPT.key`: GPT API 密钥
* `i18nTranslation.GPT.model`: GPT API 模型名称
* `i18nTranslation.prompt`: i18n 翻译的提示模板
* `i18nTranslation.toLangs`: 翻译目标语言

## 使用方法

> [!TIP]
> 使用前请首先在设置中配置 GPT API

1. 在 VSCode 中打开一个 i18n 文件（JSON 或 YAML）
2. 按下 `Ctrl+Shift+P`（在 macOS 上为 `Cmd+Shift+P`）打开命令面板
3. 输入 "i18n-translation: Translate I18n" 并选择它
4. 扩展将把文件内容翻译成指定的目标语言，并写入到同目录下的相应文件中

## Prompt

默认 Prompt 如下，你可以在扩展设置中自定义；如果置空，则使用默认模板。

```md
## 任务描述

- 任务: 请将 i18n 文件 {i18nFile} 的内容（见[## i18n 文本]）翻译为别的语言
- 要求: 
    - 翻译目标语言为: {toLang}
    - 将[## i18n 文本]翻译之后的结果直接输出，注意要保留源格式
- 词汇表:
    - empty

## i18n 文本

{content}
```

Prompt 中可以使用以下变量：

1. `{i18nFile}`：i18n 文件名；即使用 Ctrl+Shift+P 打开命令面板时，当前的 i18n 文件
2. `{toLang}`：目标语言
3. `{content}`：i18n 文件内容

## 已知问题

请在 [GitHub 仓库](https://github.com/yourusername/i18n-translation/issues) 上报告任何问题。
