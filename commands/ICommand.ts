import { App, Editor, MarkdownFileInfo, MarkdownView, TFile } from 'obsidian'
import { NewFileLocation } from "../enums";

export type Func<TRes> = () => TRes;

export interface ICommand {
    id: string;
	displayNameRibbon?: string;
    displayNameCommand: string;
    displayNameContextMenu: string;
    icon: string;
    handler(editor: Editor, checking: boolean): boolean | void;
    isPresentInContextMenu: Func<boolean>
    isEnabled: Func<boolean>;
	setApp: (app: App) => void;
	robbinHandler?: () => void;
	getSelectionWithTrim: (editor: Editor) => string;
}

export abstract class CommandBase implements ICommand {
    id: string;
	displayNameRibbon?: string;
    displayNameCommand: string;
    displayNameContextMenu: string;
    icon: string;
    isPresentInContextMenu: Func<boolean>
    isEnabled: Func<boolean>;

	app: App;

    abstract handler(editor: Editor, checking: boolean): boolean | void;

    constructor(isPresentInContextMenu: Func<boolean> = () => true, isEnabled: Func<boolean> = () => true) {
        this.isPresentInContextMenu = isPresentInContextMenu;
        this.isEnabled = isEnabled;
    }
	robbinHandler?: (() => void) | undefined;

	getSelectionWithTrim(editor: Editor) {
		return editor.getSelection().trim();
	}

	setApp(app: App) {
		this.app = app;
	}

	getFile(path: string): TFile | null {
		const { vault } = this.app;
		const absFile = vault.getAbstractFileByPath(path);
		return absFile instanceof TFile ? absFile : null;
	}

	async openFile(file: TFile, mode: NewFileLocation) {

		// Create the file and open it in the active leaf
		let leaf = this.app.workspace.getLeaf(false);
		if (mode === NewFileLocation.NewPane) {
			leaf = this.app.workspace.splitLeafOrActive();
		} else if (mode === NewFileLocation.NewTab) {
			leaf = this.app.workspace.getLeaf(true);
		} else if (!leaf) {
			// default for active pane
			leaf = this.app.workspace.getLeaf(true);
		}

		await leaf.openFile(file);
	}

	async openFileByPath(path: string, mode: NewFileLocation) {
		const file = this.getFile(path);

		if (file) {
			await this.openFile(file, mode);
		}
	}
}
