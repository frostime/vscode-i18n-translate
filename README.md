# i18n-translation

A Visual Studio Code Extension for i18n Translation, powered by GPT API.

[中文版 README](./README_zh_CN.md)

## Features

- Translate I18n files to other languages
  - Use GPT API to translate i18n files (JSON, YAML, etc.)
  - Support multiple target languages
  - Customizable translation prompt templates

- Read I18n files and convert them to d.ts files
  - Automatically generate d.ts files for use in TypeScript projects


## Extension Settings

This extension contributes the following settings:

* `i18nTranslation.GPT.endpoint`: GPT API Endpoint URL
* `i18nTranslation.GPT.key`: GPT API Key
* `i18nTranslation.GPT.model`: GPT API Model Name
* `i18nTranslation.prompt`: Prompt Template for i18n Translation
* `i18nTranslation.toLangs`: Translation Target Languages

## Usage

### Translate I18n to Other Languages

> [!TIP]
> Before using this extension, you need to obtain a GPT API Key and configure the extension settings.

1. Open an i18n file (JSON or YAML) in VSCode
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the Command Palette
3. Type "i18n-translation: Translate I18n" and select it
4. The extension will translate the file content to the specified target languages, and write the result to the corresponding files in the same directory.
    <!-- - If any text are selected, only the selected text will be translated.
    - If not, the entire file content will be translated. -->


### Convert to d.ts Files

1. Open an i18n file (JSON or YAML) in VSCode
2. Press `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS) to open the command palet
3. Type "i18n-translation: Convert to d.ts" and select it

> [!WARNING]
> The key of the i18n file should only contain letters, numbers, etc. If it contains special characters such as - _ etc., it will directly report an error and terminate the conversion.
> For example: `{ 'doc-type': 'Document Type' }` is not allowed.

## Prompt

The default prompt template for i18n Translation is as follows (in Chinese); if empty, the default prompt will be used.

```md
## Task Description

- Task: Please translate the content of the i18n file {i18nFile} (see [## i18n Text])
- Requirements:
  - Target language for translation: {toLang}
  - Output the translated result of [## i18n Text] directly, making sure to preserve the source format
- Dictionary:
  - empty

## i18n Text

{content}
```

You can use the following variables in the prompt:

1. `{i18nFile}`: The name of the i18n file; that is, the current i18n file when you open the command palette using Ctrl+Shift+P.
2. `{toLang}`: The target language.
3. `{content}`: The content of the i18n file.

## Known Issues

Please report any issues on the [GitHub repository](https://github.com/yourusername/i18n-translation/issues).

