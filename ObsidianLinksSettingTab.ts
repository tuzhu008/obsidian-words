import ObsidianLinksPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { InternalWikilinkWithoutTextAction } from "utils/helper";

export class ObsidianLinksSettingTab extends PluginSettingTab {
    plugin: ObsidianLinksPlugin;
    constructor(app: App, plugin: ObsidianLinksPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h3', { text: 'Command settings' });
        containerEl.createEl('h4', { text: 'Set link text' });
        new Setting(containerEl)
            .setName('Title separator')
            .setDesc('String used as headings separator in \'Set link text\' command.')
            .addText(text => text
                .setValue(this.plugin.settings.titleSeparator)
                .onChange(async (value) => {
                    this.plugin.settings.titleSeparator = value;
                    await this.plugin.saveSettings();
                }));


        const removeLinksFromHeadingCaptionEl = containerEl.createEl('h4', { text: 'Remove links from headings' });
        const settingRemoveLinksFromHeadingsInternalLinkWithoutTextReplacemtn = new Setting(containerEl)
            .setName('Internal wikilink without text')
            .addDropdown(dropDown =>
                dropDown
                    .addOptions({
                        Delete: "Remove",
                        ReplaceWithDestination: "Replace with destination",
                        ReplaceWithLowestNoteHeading: "Replace with lowest heading"
                    })
                    .setValue(InternalWikilinkWithoutTextAction[this.plugin.settings.removeLinksFromHeadingsInternalWikilinkWithoutTextAction])
                    .onChange(async (value: string) => {
                        this.plugin.settings.removeLinksFromHeadingsInternalWikilinkWithoutTextAction = value as InternalWikilinkWithoutTextAction;
                        await this.plugin.saveSettings();
                    }));

        // if (!this.plugin.settings.ffRemoveLinksFromHeadingsInternalWikilinkWithoutTextReplacementOptions) {
        //     removeLinksFromHeadingCaptionEl.hide();
        //     settingRemoveLinksFromHeadingsInternalLinkWithoutTextReplacemtn.settingEl.hide();
        // }

        // -- Configure context menu
        containerEl.createEl('h3', { text: 'Context menu' });
        new Setting(containerEl)
            .setName('Add Word Link')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.addWordLink)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.addWordLink = value;
                        await this.plugin.saveSettings();
                    })

            });
        new Setting(containerEl)
            .setName('Remove Word Link')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.removeWordLink)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.removeWordLink = value;
                        await this.plugin.saveSettings();
                    })

            });
        new Setting(containerEl)
            .setName('Create Word Note')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.createWordNote)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.createWordNote = value;
                        await this.plugin.saveSettings();
                    })

            });
        new Setting(containerEl)
            .setName('Edit link text')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.editLinkText)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.editLinkText = value;
                        await this.plugin.saveSettings();
                    })

            });
        new Setting(containerEl)
            .setName('Set link text')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.setLinkText)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.setLinkText = value;
                        await this.plugin.saveSettings();
                    })

            });
        const setLinkTestFromClipboardSetting = new Setting(containerEl)
            .setName('Set link text from clipboard')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.setLinkTextFromClipboard)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.setLinkTextFromClipboard = value;
                        await this.plugin.saveSettings();
                    })

            });

        const toggleSetLinkTextFromClipboard = (enabled: boolean) => {
            if (enabled) {
                setLinkTestFromClipboardSetting.settingEl.show();
            } else {
                setLinkTestFromClipboardSetting.settingEl.hide();
            }
        }
        toggleSetLinkTextFromClipboard(this.plugin.settings.ffSetLinkTextFromClipboard);

        new Setting(containerEl)
            .setName('Edit link destination')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.editLinkDestination)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.editLinkDestination = value;
                        await this.plugin.saveSettings();
                    })

            });

        const settingCopyLink = new Setting(containerEl)
            .setName('Copy link')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.copyLinkToClipboard)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.copyLinkToClipboard = value;
                        await this.plugin.saveSettings();
                    })

            });

        new Setting(containerEl)
            .setName('Copy link destination')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.copyLinkDestination)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.copyLinkDestination = value;
                        await this.plugin.saveSettings();
                    })

            });



        new Setting(containerEl)
            .setName('Unlink')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.unlink)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.unlink = value;
                        await this.plugin.saveSettings();
                    })

            });
        new Setting(containerEl)
            .setName('Convert to wikilink')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.convertToWikilink)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.convertToWikilink = value;
                        await this.plugin.saveSettings();
                    })

            });
        new Setting(containerEl)
            .setName('Convert to autolink')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.convertToAutolink)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.convertToAutolink = value;
                        await this.plugin.saveSettings();
                    })

            });
        new Setting(containerEl)
            .setName('Convert to markdown link')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.convertToMakrdownLink)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.convertToMakrdownLink = value;
                        await this.plugin.saveSettings();
                    })

            });
        if (this.plugin.settings.ffReplaceLink) {
            new Setting(containerEl)
                .setName('Replace link')
                .setDesc('')
                .addToggle((toggle) => {
                    toggle
                        .setValue(this.plugin.settings.contexMenu.replaceLink)
                        .onChange(async (value) => {
                            this.plugin.settings.contexMenu.replaceLink = value;
                            await this.plugin.saveSettings();
                        })

                });
        }

        new Setting(containerEl)
            .setName('Embed/Unembed')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.embedUnembedLink)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.embedUnembedLink = value;
                        await this.plugin.saveSettings();
                    })

            });

        new Setting(containerEl)
            .setName('Delete')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.deleteLink)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.deleteLink = value;
                        await this.plugin.saveSettings();
                    })

            });
        new Setting(containerEl)
            .setName('Create link')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.createLink)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.createLink = value;
                        await this.plugin.saveSettings();
                    })

            });
        let settings1 = new Setting(containerEl)
            .setName('Create link from clipboard')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.createLinkFromClipboard)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.createLinkFromClipboard = value;
                        await this.plugin.saveSettings();
                    })

            });

        const convertAllToMdLinksSettings = new Setting(containerEl)
            .setName('Convert all links to Markdown links')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.convertAllLinksToMdLinks)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.convertAllLinksToMdLinks = value;
                        await this.plugin.saveSettings();
                    })

            });
        const convertWikilinksToMdLinksSettings = new Setting(containerEl)
            .setName('Convert Wikilinks to Markdown links')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.convertWikilinkToMdLinks)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.convertWikilinkToMdLinks = value;
                        await this.plugin.saveSettings();
                    })

            });

        const convertUrlsToMdLinksSettings = new Setting(containerEl)
            .setName('Convert URLs to Markdown links')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.convertUrlsToMdlinks)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.convertUrlsToMdlinks = value;
                        await this.plugin.saveSettings();
                    })

            });

        const convertAutolinksToMdLinksSettings = new Setting(containerEl)
            .setName('Convert Autolinks to Markdown links')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.convertAutolinksToMdlinks)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.convertAutolinksToMdlinks = value;
                        await this.plugin.saveSettings();
                    })

            });
        const convertHtmllinksToMdLinksSettings = new Setting(containerEl)
            .setName('Convert HTML links to Markdown links')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.convertHtmllinksToMdlinks)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.convertHtmllinksToMdlinks = value;
                        await this.plugin.saveSettings();
                    })

            });

        const extractSectionSettings = new Setting(containerEl)
            .setName('Extract section')
            .setDesc('')
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.contexMenu.extractSection)
                    .onChange(async (value) => {
                        this.plugin.settings.contexMenu.extractSection = value;
                        await this.plugin.saveSettings();
                    })

            });

        const toggleExtractSection = (enabled: boolean) => {
            if (enabled) {
                extractSectionSettings.settingEl.show();
            } else {
                extractSectionSettings.settingEl.hide();
            }
        }

        toggleExtractSection(this.plugin.settings.ffExtractSection);

        // ----------------------------------------------
        // --          Early access features           --
        // ----------------------------------------------

        containerEl.createEl('h3', { text: 'Early access features' });
        const earlyAccessDescription = containerEl.createEl('p');
        earlyAccessDescription.createEl('span', {
            text: "Almost finished features with some "
        });

        earlyAccessDescription.createEl('a', {
            href: 'https://github.com/mii-key/obsidian-links/issues',
            text: 'bugs'
        });

        earlyAccessDescription.createEl('span', {
            text: " to be fixed."
        });

        // ----- Early access feature1

        // new Setting(containerEl)
        // 	.setName("Early access feature1")
        // 	.setDesc("Feature description")
        // 	.setClass("setting-item--eaccess-feature1")
        // 	.addToggle((toggle) => {
        // 		toggle
        // 			.setValue(this.plugin.settings.ffEarlyAccessFeature1)
        // 			.onChange(async (value) => {
        // 				this.plugin.settings.ffEarlyAccessFeature1 = value;
        // 				await this.plugin.saveSettings();
        // 			})
        // 	});

        // const earlyAccessFeature1SettingDesc = containerEl.querySelector(".setting-item--eaccess-feature1 .setting-item-description");
        // if (earlyAccessFeature1SettingDesc) {
        // 	earlyAccessFeature1SettingDesc.appendText(' see ');
        // 	earlyAccessFeature1SettingDesc.appendChild(
        // 		createEl('a', {
        // 			href: 'https://github.com/mii-key/obsidian-links#readme',
        // 			text: 'docs'
        // 		}));
        // 	earlyAccessFeature1SettingDesc.appendText('.');
        // }
        // ----------



        // ----------------------------------------------
        // --            Insider features              --
        // ----------------------------------------------

        containerEl.createEl('h3', { text: 'Insider features' });

        const insiderDescription = containerEl.createEl('p');


        insiderDescription.createEl('span', {
            text: "Incomplete features currently under development. Enable these features to "
        });

        insiderDescription.createEl('a', {
            href: 'https://github.com/mii-key/obsidian-links/issues',
            text: 'provide your input'
        });

        insiderDescription.createEl('span', {
            text: " and influence the direction of development."
        });

        // ------------------------------------
        // insider feature1

        // new Setting(containerEl)
        // 	.setName("Insinder feature")
        // 	.setDesc("description")
        // 	.setClass("setting-item--insider-feature1")
        // 	.addToggle((toggle) => {
        // 		toggle
        // 			.setValue(this.plugin.settings.ffFeature1)
        // 			.onChange(async (value) => {
        // 				this.plugin.settings.ffFeature1 = value;
        // 				await this.plugin.saveSettings();
        // 			})

        // 	});

        // const feature1SettingDesc = containerEl.querySelector(".setting-item--insider-feature1 .setting-item-description");

        // if (feature1SettingDesc) {
        // 	feature1SettingDesc.appendText(' see ');
        // 	feature1SettingDesc.appendChild(
        // 		createEl('a', {
        // 			href: 'https://github.com/mii-key/obsidian-links/blob/master/docs/insider/feature1.md',
        // 			text: 'docs'
        // 		}));
        // 	feature1SettingDesc.appendText('.');
        // }

        // ------------------------------------
        // feature: set link text from clipboard

        new Setting(containerEl)
            .setName("Set link text from clipboard")
            .setDesc("Set text of a link from the clipboard")
            .setClass("setting-item--insider-feature3")
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.ffSetLinkTextFromClipboard)
                    .onChange(async (value) => {
                        this.plugin.settings.ffSetLinkTextFromClipboard = value;
                        await this.plugin.saveSettings();
                        toggleSetLinkTextFromClipboard(this.plugin.settings.ffSetLinkTextFromClipboard);
                    })
            });

        const feature3SettingDesc = containerEl.querySelector(".setting-item--insider-feature3 .setting-item-description");

        if (feature3SettingDesc) {
            feature3SettingDesc.appendText(' see ');
            feature3SettingDesc.appendChild(
                createEl('a', {
                    href: 'https://github.com/mii-key/obsidian-links/blob/master/docs/insider/set-link-text-from-clipboard.md',
                    text: 'docs'
                }));
            feature3SettingDesc.appendText('.');
        }

        // ------------------------------------
        // convert links in a folder

        new Setting(containerEl)
        	.setName("Convert links in folder")
        	.setDesc("Convert links in a folder")
        	.setClass("setting-item--insider-feature-convert-links-in-folder")
        	.addToggle((toggle) => {
        		toggle
        			.setValue(this.plugin.settings.ffConvertLinksInFolder)
        			.onChange(async (value) => {
        				this.plugin.settings.ffConvertLinksInFolder = value;
        				await this.plugin.saveSettings();
        			})

        	});

        const feature1SettingDesc = containerEl.querySelector(".setting-item--insider-feature-convert-links-in-folder .setting-item-description");

        if (feature1SettingDesc) {
        	feature1SettingDesc.appendText(' see ');
        	feature1SettingDesc.appendChild(
        		createEl('a', {
        			href: 'https://github.com/mii-key/obsidian-links/blob/master/docs/insider/convert-links-in-folder.md',
        			text: 'docs'
        		}));
        	feature1SettingDesc.appendText('.');
        }

        // feature: extract section

        // new Setting(containerEl)
        //     .setName("Extract section")
        //     .setDesc("Extract section into a note.")
        //     .setClass("setting-item--insider-feature3")
        //     .addToggle((toggle) => {
        //         toggle
        //             .setValue(this.plugin.settings.ffExtractSection)
        //             .onChange(async (value) => {
        //                 this.plugin.settings.ffExtractSection = value;
        //                 await this.plugin.saveSettings();
        //                 toggleExtractSection(value);
        //             })
        //     });

        // const feature3SettingDesc = containerEl.querySelector(".setting-item--insider-feature3 .setting-item-description");

        // if (feature3SettingDesc) {
        //     feature3SettingDesc.appendText(' see ');
        //     feature3SettingDesc.appendChild(
        //         createEl('a', {
        //             href: 'https://github.com/mii-key/obsidian-links/blob/master/docs/insider/extract-section.md',
        //             text: 'docs'
        //         }));
        //     feature3SettingDesc.appendText('.');
        // }

        // // feature: options for remove internal wikilink without text replacement

        // new Setting(containerEl)
        //     .setName("Configure `Remove links from heading' command")
        //     .setDesc("Configure `Remove links from heading' command behavior.")
        //     .setClass("setting-item--insider-feature3")
        //     .addToggle((toggle) => {
        //         toggle
        //             .setValue(this.plugin.settings.ffRemoveLinksFromHeadingsInternalWikilinkWithoutTextReplacementOptions)
        //             .onChange(async (value) => {
        //                 this.plugin.settings.ffRemoveLinksFromHeadingsInternalWikilinkWithoutTextReplacementOptions = value;
        //                 if (value) {
        //                     removeLinksFromHeadingCaptionEl.show();
        //                     settingRemoveLinksFromHeadingsInternalLinkWithoutTextReplacemtn.settingEl.show();
        //                 } else {
        //                     removeLinksFromHeadingCaptionEl.hide();
        //                     settingRemoveLinksFromHeadingsInternalLinkWithoutTextReplacemtn.settingEl.hide();
        //                 }
        //                 await this.plugin.saveSettings();
        //             })

        //     });

        // const feature3SettingDesc = containerEl.querySelector(".setting-item--insider-feature3 .setting-item-description");

        // if (feature3SettingDesc) {
        // 	feature3SettingDesc.appendText(' see ');
        // 	feature3SettingDesc.appendChild(
        // 		createEl('a', {
        // 			href: 'https://github.com/mii-key/obsidian-links/blob/master/docs/insider/configure-remove-links-from-headings.md',
        // 			text: 'docs'
        // 		}));
        // 		feature3SettingDesc.appendText('.');
        // }

       

        
    }
}
