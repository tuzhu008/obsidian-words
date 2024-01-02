import {
	App,
	normalizePath,
	Platform,
	TFolder,
	Notice,
	Modal,
	Instruction,
  } from 'obsidian';
  import { NewFileLocation } from 'enums';
  import { path } from 'utils/path';

  export default class InputModal extends Modal {
	folder: TFolder;
	newDirectoryPath: string;
	inputEl: HTMLInputElement;
	instructionsEl: HTMLElement;
	inputListener: EventListener;

	options: {
		onFinish: (text: string) => void;
	}
  
	constructor(app: App, options: {
		onFinish: (text: string) => void
	}) {
	  super(app);

	  this.options = options;
  
	  // create input
	  this.inputEl = document.createElement('input');
	  this.inputEl.type = 'text';
	  this.inputEl.placeholder = 'Type filename for new note';
	  this.inputEl.className = 'prompt-input';
  
	  // create instructions
	  const instructions = [
		{
		  command: '↵',
		  purpose: 'to create note (default: Untitled)',
		},
		{
		  command: 'esc',
		  purpose: 'to dismiss creation',
		},
	  ] as Instruction[];
	  this.instructionsEl = document.createElement('div');
	  this.instructionsEl.addClass('prompt-instructions');
	  const children = instructions.map((x) => {
		const child = document.createElement('div');
		child.addClass('prompt-instruction');
  
		const command = document.createElement('span');
		command.addClass('prompt-instruction-command');
		command.innerText = x.command;
		child.appendChild(command);
  
		const purpose = document.createElement('span');
		purpose.innerText = x.purpose;
		child.appendChild(purpose);
  
		return child;
	  });
	  for (const child of children) {
		this.instructionsEl.appendChild(child);
	  }
  
	  // make modal
	  this.modalEl.className = 'prompt';
	  this.modalEl.innerHTML = '';
	  this.modalEl.appendChild(this.inputEl);
	  this.modalEl.appendChild(this.instructionsEl);
  
	  this.inputListener = this.listenInput.bind(this);
	}
  
	setFolder(folder: TFolder, newDirectoryPath: string) {
	  this.folder = folder;
	  this.newDirectoryPath = newDirectoryPath;
	}
  
	listenInput(evt: KeyboardEvent) {
	  if (evt.key === 'Enter') {
		// prevent enter after note creation
		evt.preventDefault();
		// Do work
		this.options.onFinish(this.inputEl.value);
		this.close();
	  }
	}
  
	onOpen() {
	  this.inputEl.focus();
	  this.inputEl.addEventListener('keydown', this.inputListener);
	}
  
	onClose() {
	  this.inputEl.removeEventListener('keydown', this.inputListener);
	}
  }
