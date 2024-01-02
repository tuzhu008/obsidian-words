import { App, Editor, Notice, normalizePath, Platform, Modal } from "obsidian";
import { CommandBase, Func, ICommand } from "./ICommand";
import { HasLinks, LinkData, LinkTypes, findLink, removeLinks } from "../utils/helper";
import { path } from "../utils/path";
import { NewFileLocation } from "../enums";
import InputModal from "modals/InputModal";

export class CreateWordNoteFromSelectionCommand extends CommandBase {
	mode: NewFileLocation = NewFileLocation.NewTab;

	constructor(
		isPresentInContextMenu: Func<boolean> = () => true,
		isEnabled: Func<boolean> = () => true
	) {
		super(isPresentInContextMenu, isEnabled);
		this.id = "editor-create-word-note-from-selection";
		this.displayNameCommand = "Create Word Note";
		this.displayNameContextMenu = "Create Word Note";
		this.icon = "note";
	}

	handler(editor: Editor, checking: boolean): boolean | void {
		if (checking && !this.isEnabled()) {
			return false;
		}

		if (checking) {
			return true;
		}

		const selection = editor.getSelection();

		if (selection) {
			this.createNewNote(selection);
			return;
		}

		const modal = new InputModal(this.app, {
			onFinish: (text) => {
				this.createNewNote(text);
			}
		});

		modal.open();
	}

	async createNewNote(word: string): Promise<void> {
		const { vault } = this.app;
		const { adapter } = vault;
		// const prependDirInput = path.join(this.newDirectoryPath, input);
		// const { dir, name } = path.parse(prependDirInput);
		// const directoryPath = path.join(this.folder.path, dir);
		const directoryPath = path.join('Vocabulary', word.charAt(0).toUpperCase());
		const filePath = path.join('Vocabulary', word.charAt(0).toUpperCase(),`${word}.md`);

		// this.createDirectory(directoryPath);

		try {
			const fileExists = await adapter.exists(filePath);
			let File: any;
			if (fileExists) {
				throw new Error(`${filePath} already exists`);
			}
			if (directoryPath !== "") {
				// If `input` includes a directory part, create it
				await this.createDirectory(directoryPath);
			}
			File = await vault.create(filePath, "");
			// Create the file and open it in the active leaf
			let leaf = this.app.workspace.getLeaf(false);
			if (this.mode === NewFileLocation.NewPane) {
				leaf = this.app.workspace.splitLeafOrActive();
			} else if (this.mode === NewFileLocation.NewTab) {
				leaf = this.app.workspace.getLeaf(true);
			} else if (!leaf) {
				// default for active pane
				leaf = this.app.workspace.getLeaf(true);
			}

			await navigator.clipboard.writeText(word);

			await leaf.openFile(File);
		} catch (error) {
			new Notice(error.toString());
		}
	}

	private async createDirectory(dir: string): Promise<void> {
		const { vault } = this.app;
		const { adapter } = vault;
		const root = vault.getRoot().path;
		// const directoryPath = path.join(this.folder.path, dir);
		const directoryPath = dir
		const directoryExists = await adapter.exists(directoryPath);
		// ===============================================================
		// -> Desktop App
		// ===============================================================
		if (!Platform.isIosApp) {
			if (!directoryExists) {
				return adapter.mkdir(normalizePath(directoryPath));
			}
		}
		// ===============================================================
		// -> Mobile App (IOS)
		// ===============================================================
		// This is a workaround for a bug in the mobile app:
		// To get the file explorer view to update correctly, we have to create
		// each directory in the path one at time.

		// Split the path into an array of sub paths
		// Note: `normalizePath` converts path separators to '/' on all platforms
		// @example '/one/two/three/' ==> ['one', 'one/two', 'one/two/three']
		// @example 'one\two\three' ==> ['one', 'one/two', 'one/two/three']
		const subPaths: string[] = normalizePath(directoryPath)
			.split("/")
			.filter((part) => part.trim() !== "")
			.map((_, index, arr) => arr.slice(0, index + 1).join("/"));

		// Create each directory if it does not exist
		for (const subPath of subPaths) {
			const directoryExists = await adapter.exists(
				path.join(root, subPath)
			);
			if (!directoryExists) {
				await adapter.mkdir(path.join(root, subPath));
			}
		}
	}
}
