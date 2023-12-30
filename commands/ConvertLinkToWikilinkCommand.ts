import { Editor } from "obsidian";
import { CommandBase, Func, ICommand } from "./ICommand"
import { HasLinks, LinkData, LinkTypes, findLink, removeLinks } from "../utils/helper";

export class ConvertLinkToWikilinkCommand extends CommandBase {
	// TODO: refactor
	readonly EmailScheme: string = "mailto:";

	constructor(isPresentInContextMenu: Func<boolean> = () => true, isEnabled: Func<boolean> = () => true) {
		super(isPresentInContextMenu, isEnabled)
		this.id = 'editor-convert-link-to-wikilink';
		this.displayNameCommand = 'Convert to Wikilink';
		this.displayNameContextMenu = 'Convert to wikilink';
		this.icon = 'rotate-cw';
	}

	handler(editor: Editor, checking: boolean): boolean | void {
		if(checking && !this.isEnabled()){
			return false;
		}
		const text = editor.getValue();
		const cursorOffset = editor.posToOffset(editor.getCursor('from'));
		const linkData = findLink(text, cursorOffset, cursorOffset, LinkTypes.Markdown);
		if (checking) {
			return !!linkData && linkData.link && !linkData.link.content.trim().includes(":");
		}

		if (linkData) {
			this.convertLinkToWikiLink(linkData, editor);
		}
	}

	convertLinkToWikiLink(linkData: LinkData, editor: Editor) {
		const link = linkData.type === LinkTypes.Markdown ? (linkData.link ? decodeURI(linkData.link.content) : "") : linkData.link;
		const text = linkData.text ? (linkData.text.content !== link ? "|" + linkData.text.content : "") : "";
		//TODO: use const for !
		const embededSymbol = linkData.embedded ? '!' : '';
		const rawLinkText = `${embededSymbol}[[${link}${text}]]`;
		editor.replaceRange(
			rawLinkText,
			editor.offsetToPos(linkData.position.start),
			editor.offsetToPos(linkData.position.end));
		editor.setCursor(editor.offsetToPos(linkData.position.start + rawLinkText.length));
	}
}
