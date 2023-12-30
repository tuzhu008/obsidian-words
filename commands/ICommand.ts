import { App, Editor, MarkdownFileInfo, MarkdownView } from 'obsidian'

export type Func<TRes> = () => TRes;

export interface ICommand {
    id: string;
    displayNameCommand: string;
    displayNameContextMenu: string;
    icon: string;
    handler(editor: Editor, checking: boolean): boolean | void;
    isPresentInContextMenu: Func<boolean>
    isEnabled: Func<boolean>;
	setApp: (app: App) => void;
}

export abstract class CommandBase implements ICommand {
    id: string;
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

	setApp(app: App) {
		this.app = app;
	}
}
