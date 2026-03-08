import type { Editor } from '@milkdown/kit/core';
import { Crepe } from '@milkdown/crepe';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { invoke } from "@tauri-apps/api/core";
import { replaceAll } from '@milkdown/kit/utils';

export class EditorManager {
    private editor: Editor | null = null;
    private crepe: Crepe | null = null;

    load_file = async (file_path: string) => {
        try {
            const file_content: string = await invoke("read_file", {
                path: file_path,
            });
            return file_content;
        } catch (e) {
            console.error('load_file failed:', e);
            return "";
        }
    };

    save_file = async (file_path: string) => {
        await invoke("write_file", {
            path: file_path,
            content: this.crepe?.getMarkdown() ?? "",
        });
    }

    create = async (root: HTMLElement, on_change?: (markdown: string) => void) => {
        // Clear any residual DOM from a previous mount (e.g. React StrictMode double-invoke)
        root.innerHTML = '';
        const crepe = new Crepe({
            root,
            defaultValue: '',
            featureConfigs: {
                [Crepe.Feature.CodeMirror]: {
                    theme: document.body.classList.contains('vscode-dark') ? vscodeDark : vscodeLight,
                },
            },
        });
        const { editor } = crepe;
        console.log(editor);

        crepe.on(listener => {
            listener.markdownUpdated((_ctx, markdown) => {
                on_change?.(markdown);
            });
        });

        try {
            await crepe.create();
        }
        catch (e) {
            console.warn(e);
        }

        this.crepe = crepe;
        this.editor = editor;

        return editor;
    };

    destroy = async () => {
        if (this.crepe) {
            await this.crepe.destroy();
            this.crepe = null;
            this.editor = null;
        }
    };

    update = (markdown: string): void => {
        if (typeof markdown !== 'string') {
            console.warn("Non-Markdown recieved", markdown);
            return;
        }
        this.editor?.action(replaceAll(markdown, true));
    };
}
