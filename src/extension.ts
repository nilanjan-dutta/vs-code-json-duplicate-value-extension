// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { stringify } from 'querystring';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "jsonduplicatevaluecheck" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.checkDuplciateValue',
    () => {
      // The code you place here will be executed every time your command is executed
      let activeEditor = vscode.window.activeTextEditor;
      if (activeEditor) {
        let fileExtension = activeEditor.document.fileName.split('.').pop();
        if (fileExtension && fileExtension === 'json') {
          let text = activeEditor.document.getText();
          let jsonObject = JSON.parse(text);
          if (!jsonObject) {
            return;
          }
          let jsonKeys = Object.keys(jsonObject);
          for (let i = 0; i < jsonKeys.length; i++) {
            for (let j = i + 1; j < jsonKeys.length; j++) {
              if (jsonObject[jsonKeys[i]] === jsonObject[jsonKeys[j]]) {
                vscode.window.showInformationMessage(
                  'Duplicate Value Found for: ' + jsonObject[jsonKeys[j]]
                );
              }
            }
          }
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
