import { Editor } from "obsidian";
import { CommandBase, Func, ICommand  } from "./ICommand"
import { HasLinks, LinkData, LinkTypes, findLink, removeLinks } from "../utils/helper";

export class AddWordLinkFromSelectionCommand extends CommandBase {
	constructor(isPresentInContextMenu: Func<boolean> = () => true, isEnabled: Func<boolean> = () => true){
		super(isPresentInContextMenu, isEnabled);
		this.id = 'editor-add-word-link-from-selection';
		this.displayNameCommand = 'Add Word Link';
		this.displayNameContextMenu = 'Add Word Link';
		this.icon = 'link';
	}

    handler(editor: Editor, checking: boolean) : boolean | void {
		if(checking && !this.isEnabled()){
			return false;
		}

		const selection = editor.getSelection();

		if (checking) {
			return !!selection;
		}

		// const linkStart = editor.posToOffset(editor.getCursor('from'));
		editor.replaceSelection(`[[Vocabulary/${selection[0].toUpperCase()}/${selection}.md|${selection}]]`);
		// editor.setCursor(editor.offsetToPos(linkStart + 2));
    }
}
