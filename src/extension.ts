import * as vscode from "vscode";
import { exec } from "child_process";

export function activate(context: vscode.ExtensionContext) {
  // Register a listener for when files are saved
  let disposable = vscode.workspace.onDidSaveTextDocument((document) => {
    if (document.languageId === "scss") {
      const config = vscode.workspace.getConfiguration("sassCompiler");
      const inputFile =
        config.get<string>("inputFile") || "src/css/global.scss";
      const outputFile =
        config.get<string>("outputFile") || "src/css/global.min.css";

      // Construct the SASS command
      const command = `sass --style=compressed ${inputFile} ${outputFile}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          vscode.window.showErrorMessage(`Error: ${stderr}`);
        } else {
          vscode.window.showInformationMessage(
            "SCSS compiled to minified CSS successfully!"
          );
        }
      });
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
