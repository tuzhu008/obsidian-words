import { Editor } from "obsidian";
import { CommandBase, Func, ICommand } from "./ICommand"
import { HasLinks, LinkData, LinkTypes, findLink, removeLinks } from "../utils/helper";

export class RemoveWordLinkFromSelectionCommand extends CommandBase {

	constructor(isPresentInContextMenu: Func<boolean> = () => true, isEnabled: Func<boolean> = () => true) {
		super(isPresentInContextMenu, isEnabled);
		this.id = 'editor-remove-word-link';
		this.displayNameCommand = 'Remove Word Link';
		this.displayNameContextMenu = 'Remove Word Link';
		this.icon = 'trash-2';
	}

	handler(editor: Editor, checking: boolean): boolean | void {
		if(checking && !this.isEnabled()){
			return false;
		}

		const text = editor.getValue();
		const cursorOffset = editor.posToOffset(editor.getCursor('from'));
		const linkData = findLink(text, cursorOffset, cursorOffset);
		if (checking) {
			return !!linkData;
		}
		if (linkData) {
			this.deleteLink(linkData, editor);
		}
	}

	deleteLink(linkData: LinkData, editor: Editor) {
		editor.replaceSelection(linkData.text?.content || '');
	}
}
