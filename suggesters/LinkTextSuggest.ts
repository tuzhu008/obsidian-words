import { Editor, EditorPosition, EditorSuggest, EditorSuggestContext, EditorSuggestTriggerInfo, TFile } from "obsidian";
import { LinkTypes, getFileName } from "utils/helper";
import { ILinkTextSuggestContext } from "./ILinkTextSuggestContext";


export class LinkTextSuggest extends EditorSuggest<string> {
	tags: string[];
	suggestContext: ILinkTextSuggestContext;

	constructor(context: ILinkTextSuggestContext) {
		super(context.app);
		this.suggestContext = context;
	}

	onTrigger(
		cursor: EditorPosition,
		editor: Editor,
		file: TFile
	): EditorSuggestTriggerInfo | null {
		if (!this.suggestContext.provideSuggestions || !this.suggestContext.linkData) {
			return null;
		}

		const linkEnd = editor.offsetToPos(this.suggestContext.linkData?.position.end);
		return {
			start: linkEnd,
			end: linkEnd,
			query: ""
		};
	}

	getSuggestions(context: EditorSuggestContext): string[] {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		let noteName = this.suggestContext.linkData!.type == LinkTypes.Markdown ? 
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			getFileName(decodeURI(this.suggestContext.linkData!.link!.content))
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			:getFileName(this.suggestContext.linkData!.link!.content);
		noteName = noteName.substring(0, noteName.indexOf('#'));

		return [
			// last title
			this.suggestContext.titles[this.suggestContext.titles.length - 1],
			// note name with all specified titles
			[noteName, ...this.suggestContext.titles].join(this.suggestContext.titleSeparator),
			// note name
			noteName
		];
	}

	renderSuggestion(suggestion: string, el: HTMLElement): void {
		const outer = el.createDiv({ cls: "ES-suggester-container" });
		outer.createDiv({ cls: "ES-tags" }).setText(`${suggestion}`);
	}

	// TODO: refactor
	selectSuggestion(suggestion: string): void {
		if (!this.context?.editor || !this.suggestContext.linkData?.link) {
			return;
		}
		const linkData = this.suggestContext.linkData;
		if (linkData?.type == LinkTypes.Wiki) {
			const editor = this.context.editor;
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			let textStartOffset = linkData.position.start + linkData.link!.position.end;
			if(linkData.text?.content){
				editor.replaceRange("|" + suggestion, editor?.offsetToPos(textStartOffset), 
					editor?.offsetToPos(textStartOffset + linkData.text?.content.length + 1));
			} else{
				editor.replaceRange("|" + suggestion, editor?.offsetToPos(textStartOffset));
			}
			textStartOffset++;
			editor.setSelection(editor.offsetToPos(textStartOffset), editor.offsetToPos(textStartOffset + suggestion.length));
			this.suggestContext.clearLinkData();


		} else if (linkData?.type == LinkTypes.Markdown){
			const editor = this.context.editor;
			const textStartOffset = linkData?.position.start + 1;

			if(linkData.text?.content){
				editor.replaceRange(suggestion, editor?.offsetToPos(textStartOffset), 
					editor?.offsetToPos(textStartOffset + linkData.text?.content.length));
			} else{
				editor.replaceRange(suggestion, editor?.offsetToPos(textStartOffset));
			}
			editor.setSelection(editor.offsetToPos(textStartOffset), editor.offsetToPos(textStartOffset + suggestion.length));
			
			this.suggestContext.clearLinkData();
		}
	}
}
