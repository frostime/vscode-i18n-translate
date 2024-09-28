import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

interface FileInfo {
    ext: string;
    dir: string;
    name: string;
    content: string;
}

export class FileHandler {
    public getFileInfo(document: vscode.TextDocument): FileInfo | null {
        const filePath = document.uri.fsPath;
        const fileExt = path.extname(filePath);

        if (fileExt !== '.json' && fileExt !== '.yaml' && fileExt !== '.yml') {
            vscode.window.showWarningMessage('当前文件不是 JSON 或 YAML 文件');
            return null;
        }

        const fileContent = document.getText();
        if (!fileContent.trim()) {
            vscode.window.showWarningMessage('当前文件为空');
            return null;
        }

        return {
            ext: fileExt,
            dir: path.dirname(filePath),
            name: path.basename(filePath),
            content: fileContent
        };
    }

    public createTranslatedFile(dir: string, toLang: string, ext: string): string {
        return path.join(dir, `${toLang}${ext}`);
    }

    public writeFile(filePath: string, content: string): void {
        fs.writeFileSync(filePath, content);
    }
}