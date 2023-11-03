# custom-search README

This is a VSCode extension to help you perform more specific code changes over large code repositories. VSCode offers this:
![image](https://github.com/zhiyi-zhang-duke/VSCodeCustomSearch/assets/68999131/e2c26f31-4f9a-4860-bec1-44bc4ee88d8d)

A one regex or one string search that allows you to filter by files. This just isn't good enough sometimes. 
Sometimes you want to find files that match multiple regexs, and multiple regex paths. This extension achieves that.

## Features

Go to the command palette and choose Custom Search

This brings up a short questionaire where you can input your comma separated regexs.

The extension then searches your entire code base and searches for all files that match these criteria returning you a nice link enabled list of the results.

## Setup

npm run package

npm run watch

Go to extension.ts, hit F5

Go to new VSCode window, ctr (or cmd) + p, type > Custom Search, enter search parameters

Also helpful:
Help > Toggle Developer Tools

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
