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
	okButtonEl: HTMLButtonElement;
	inputListener: EventListener;
	okButtonListener: EventListener;

	options: {
		onFinish: (text: string) => void;
		okButton?: boolean;
	}
  
	constructor(app: App, options: {
		onFinish: (text: string) => void,
		okButton?: boolean,
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

	  this.okButtonEl = document.createElement('button');
	  this.okButtonEl.innerText = '确定';
  
	  // make modal
	  this.modalEl.className = 'prompt';
	  this.modalEl.innerHTML = '';
	  this.modalEl.appendChild(this.inputEl);

	  if (options.okButton) {
		this.modalEl.appendChild(this.okButtonEl);
	  } else {
		this.modalEl.appendChild(this.instructionsEl);
	  }
  
	  this.inputListener = this.listenInput.bind(this);
	  this.okButtonListener = this.listenOkButton.bind(this);
	}
  
	setFolder(folder: TFolder, newDirectoryPath: string) {
	  this.folder = folder;
	  this.newDirectoryPath = newDirectoryPath;
	}
  
	listenInput(evt: KeyboardEvent) {
	  if (evt.key === 'Enter' && !this.options.okButton) {
		// prevent enter after note creation
		evt.preventDefault();
		// Do work
		this.options.onFinish(this.inputEl.value);
		this.close();
	  }
	}

	listenOkButton(evt: Event) {
		console.log('click')
		evt.preventDefault();
		// Do work
		this.options.onFinish(this.inputEl.value);
		this.close();
	}
  
	onOpen() {
	  this.inputEl.focus();
	  this.inputEl.addEventListener('keydown', this.inputListener);
	  this.okButtonEl.addEventListener('click', this.okButtonListener);
	}
  
	onClose() {
	  this.inputEl.removeEventListener('keydown', this.inputListener);
	  this.okButtonEl.removeEventListener('click', this.okButtonListener);
	}
  }
