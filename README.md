# i18n-translation

A Visual Studio Code Extension for i18n Translation, powered by GPT API.

[中文版 README](./README_zh_CN.md)

## Features

- Translate i18n files (JSON, YAML etc.) using GPT API
- Support for multiple target languages
- Customizable translation prompt
- Easy-to-use command in VSCode

## Requirements

- Visual Studio Code ^1.93.0
- GPT API Key

## Extension Settings

This extension contributes the following settings:

* `i18nTranslation.GPT.endpoint`: GPT API Endpoint URL
* `i18nTranslation.GPT.key`: GPT API Key
* `i18nTranslation.GPT.model`: GPT API Model Name
* `i18nTranslation.prompt`: Prompt Template for i18n Translation
* `i18nTranslation.toLangs`: Translation Target Languages

## Usage

1. Open an i18n file (JSON or YAML) in VSCode
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the Command Palette
3. Type "i18n-translation: Translate I18n" and select it
4. The extension will translate the file content to the specified target languages, and write the result to the corresponding files in the same directory.

## i18n Text

{content}

You can use the following variables in the prompt:

1. `{i18nFile}`: The name of the i18n file; that is, the current i18n file when you open the command palette using Ctrl+Shift+P.
2. `{toLang}`: The target language.
3. `{content}`: The content of the i18n file.

## Known Issues

Please report any issues on the [GitHub repository](https://github.com/yourusername/i18n-translation/issues).

