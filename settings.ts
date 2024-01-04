import { InternalWikilinkWithoutTextAction } from "utils/helper";

export interface IObsidianLinksSettings {
	linkReplacements: { source: string, target: string }[];
	titleSeparator: string;
	showPerformanceNotification: boolean;
	
	//TODO: remove
	removeLinksFromHeadingsInternalWikilinkWithoutTextReplacement: string;

	removeLinksFromHeadingsInternalWikilinkWithoutTextAction: InternalWikilinkWithoutTextAction;
	// feature flags
	ffReplaceLink: boolean;
	ffExtractSection: boolean;
	ffSetLinkTextFromClipboard: boolean;
	ffWrapNoteInFolder: boolean;
	ffConvertLinksInFolder: boolean;

	//context menu
	contexMenu: {
		addWordLink: boolean,
		removeWordLink: boolean,
		createWordNote: boolean,
		// addWordTask: boolean,

		editLinkText: boolean;
		setLinkText: boolean;
		setLinkTextFromClipboard: boolean;
		editLinkDestination: boolean;
		copyLinkDestination: boolean;
		unlink: boolean;
		convertToWikilink: boolean;
		convertToAutolink: boolean;
		convertToMakrdownLink: boolean;
		replaceLink: boolean;
		embedUnembedLink: boolean;
		deleteLink: boolean;
		createLink: boolean;
		createLinkFromClipboard: boolean;
		convertAllLinksToMdLinks: boolean;
		convertWikilinkToMdLinks : boolean;
		convertUrlsToMdlinks: boolean;
		convertAutolinksToMdlinks: boolean;
		convertHtmllinksToMdlinks: boolean;
		extractSection: boolean;
		wrapNoteInFolder: boolean;
		copyLinkToClipboard: boolean;
	}
}


export const DEFAULT_SETTINGS: IObsidianLinksSettings = {
	linkReplacements: [],
	titleSeparator: " • ",
	showPerformanceNotification: false,

	//TODO: remove
	removeLinksFromHeadingsInternalWikilinkWithoutTextReplacement: "Destination",

	removeLinksFromHeadingsInternalWikilinkWithoutTextAction: InternalWikilinkWithoutTextAction.None,
	//feature flags
	ffReplaceLink: false,
	ffExtractSection: false,
	ffSetLinkTextFromClipboard: false,
	ffWrapNoteInFolder: false,
	ffConvertLinksInFolder: false,

	//context menu
	contexMenu: {
		addWordLink: true,
		removeWordLink: true,
		createWordNote: true,
		// addWordTask: true,

		editLinkText: true,
		setLinkText: true,
		setLinkTextFromClipboard: true,
		editLinkDestination: true,
		copyLinkDestination: true,
		unlink: true,
		convertToWikilink: true,
		convertToAutolink: true,
		convertToMakrdownLink: true,
		replaceLink: true,
		embedUnembedLink: true,
		deleteLink: true,
		createLink: true,
		createLinkFromClipboard: true,
		convertAllLinksToMdLinks: false,
		convertWikilinkToMdLinks : false,
		convertUrlsToMdlinks: false,
		convertAutolinksToMdlinks: false,
		convertHtmllinksToMdlinks: false,
		extractSection: false,
		wrapNoteInFolder: false,
		copyLinkToClipboard: false
	}
}
