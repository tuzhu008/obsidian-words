/** 
 * 添加批注
 * @author yangjiangming <449654337@qq.com>
 * @date 2024-04-25 09:29:41
 */

import { Editor } from "obsidian";
import { CommandBase, Func, ICommand  } from "./ICommand"
import InputModal from "modals/InputModal";

export class AddFuriganaFromSelectionCommand extends CommandBase {
	constructor(isPresentInContextMenu: Func<boolean> = () => true, isEnabled: Func<boolean> = () => true){
		super(isPresentInContextMenu, isEnabled);
		this.id = 'editor-add-furigana-from-selection';
		this.displayNameCommand = 'Add Furigana';
		this.displayNameContextMenu = 'Add Furigana';
		this.icon = 'link';
	}

    handler(editor: Editor, checking: boolean) : boolean | void {
		if(checking && !this.isEnabled()){
			return false;
		}

		const selection = this.getSelectionWithTrim(editor);

		if (checking) {
			return !!selection;
		}

		if (/[=＝]/.test(selection)) {
			// 替换分隔符
			const content = selection.replace(/[=＝]/ig, '|');
			editor.replaceSelection(`{${content}}`);
			return;
		}

		const modal = new InputModal(this.app, {
			okButton: true,
			onFinish: (text: string) => {
				const furigana = text
					.replace(/^[=＝]+/ig, '')
					.replace(/[=＝]+$/ig, '')
					.replace(/[=＝]+/ig, '|');
				editor.replaceSelection(`{${selection}|${furigana}}`);
			}
		});

		modal.open();

		// const linkStart = editor.posToOffset(editor.getCursor('from'));
		// editor.replaceSelection(`[[Vocabulary/${selection[0].toUpperCase()}/${selection}.md|${selection}]]`);
		// editor.setCursor(editor.offsetToPos(linkStart + 2));
    }
}
