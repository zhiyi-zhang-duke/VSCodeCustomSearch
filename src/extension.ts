// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log("This is context in activate", context);
    let disposable = vscode.commands.registerCommand('custom-search.customSearch', 
		async () => {
			await handleUserInputAndSearch(context);
		});
    context.subscriptions.push(disposable);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "custom-search" is now active!');
}

async function handleUserInputAndSearch(context: vscode.ExtensionContext) {
	const filePathInput = await vscode.window.showInputBox({
        prompt: 'Enter comma separated regex patterns to match to file paths',
        placeHolder: 'e.g., .*\\.js$, .*\\.ts$, .*\\.json$'
    });
	
    const fileContentInput = await vscode.window.showInputBox({
        prompt: 'Enter comma separated regex patterns to match to file contents',
        placeHolder: 'e.g., ^abc.*, .*xyz$'
    });

	// TODO: This assumes these inputs need to be populated but they could easily
	// be empty. That should default ot a skip case.
    if (fileContentInput && filePathInput) {
        const fileContentRegexPatterns = fileContentInput.split(',');
		const filePathRegexPatterns = filePathInput.split(',');
        searchFiles(fileContentRegexPatterns, filePathRegexPatterns, context);
    }
}

// TODO: Handle filePathPatterns
async function searchFiles(
		fileContentPatterns: string[],
		filePathPatterns: string [],
		context: vscode.ExtensionContext
	) {
	console.log("Searching files");
	// Add other common patterns to ignore here
	const workspaceFolders = vscode.workspace.workspaceFolders?.filter(folder => !folder.uri.path.includes('node_modules'));
	console.log("Workplace folders", workspaceFolders);
	if (!workspaceFolders) return;

    const folder = workspaceFolders[0];
    let matchedFiles: string[] = [];  // Array to store paths of matched files
  
	for (const pattern of fileContentPatterns) {
	  let regex = new RegExp(pattern.trim());
	  let uris = await vscode.workspace.findFiles('**/*', '**/node_modules/**'); // Find all files excluding node_modules
	  for (const uri of uris) {
		let doc;
		try {
			doc = await vscode.workspace.openTextDocument(uri);
		} catch (error) {
			console.error(`Error opening file ${uri.fsPath}:`, error);
			continue;  // Skip processing for this file and move to the next one
		}
		
		// console.log("Checking file", uri.fsPath);
		if (regex.test(doc.getText())) {
			// console.log(`Match found in file: ${uri.fsPath}`);  // Log the file where a match is found
			// Handle matches, e.g., highlight, open file, etc.
			matchedFiles.push(uri.fsPath);
		}
	}
}

    // Call the helper function to display the results in a Webview panel
	console.log("Matched files", matchedFiles);
    displayResultsInWebview(matchedFiles, context);	
}

  function displayResultsInWebview(files: string[], context: vscode.ExtensionContext) {
	console.log("This is context in displayResultsInWebview", context);
    const panel = vscode.window.createWebviewPanel(
        'searchResults',
        'Search Results',
        vscode.ViewColumn.One,
        {
            // Enable scripts in the WebView
            enableScripts: true
        }
    );

    // Generate HTML content for the Webview
    let htmlContent = `
        <html>
            <body>
                <h2>Search Results</h2>
                <ul>
    `;

    for (const file of files) {
        htmlContent += `<li><a href="#" onclick="handleLinkClick('${file}');">${file}</a></li>`;
    }

    htmlContent += `
                </ul>
                <script>
                    const vscode = acquireVsCodeApi();
                    function handleLinkClick(filePath) {
                        // Use VS Code API to send a message to the extension
                        vscode.postMessage({ 
                            type: 'openFile',
                            path: filePath
                        });
                        return false;  // Prevent default navigation
                    }
                </script>
            </body>
        </html>
    `;

    panel.webview.html = htmlContent;

    panel.webview.onDidReceiveMessage(
        message => {
            if (message.type === 'openFile') {
                // Use the VS Code API to open the file
                let openPath = vscode.Uri.file(message.path);
                vscode.window.showTextDocument(openPath);
            }
        },
        undefined,
        context.subscriptions
    );
}



// This method is called when your extension is deactivated
export function deactivate() {}
