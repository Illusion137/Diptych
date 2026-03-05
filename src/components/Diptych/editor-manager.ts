import type { Editor } from '@milkdown/kit/core';
import { editorViewCtx, parserCtx } from '@milkdown/kit/core';
import { Slice } from '@milkdown/kit/prose/model';
import { Crepe } from '@milkdown/crepe';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { invoke } from "@tauri-apps/api/core";
import { commonmark } from "@milkdown/preset-commonmark";

export class EditorManager {
    private editor: Editor | null = null;
    private crepe: Crepe | null = null;

    load_file = async (file_path: string) => {
        try {
            const file_content: string = await invoke("read_file", {
                path: file_path,
            });
            return file_content;
        } catch (_) {
            return "";
        }
    };

    save_file = async (file_path: string) => {
        await invoke("write_file", {
            path: file_path,
            content: this.crepe?.getMarkdown() ?? "",
        });
    }

    create = async (root: HTMLElement) => {
        const crepe = new Crepe({
            root,
            defaultValue: '',
            featureConfigs: {
                [Crepe.Feature.CodeMirror]: {
                    theme: document.body.classList.contains('vscode-dark') ? vscodeDark : vscodeLight,
                },
                // [Crepe.Feature.ImageBlock]: {
                //     proxyDomURL: (originalUrl) => {
                //         if (originalUrl.length === 0) {
                //             return '';
                //         }
                //         const promise = ResourceManager.Instance.add(originalUrl);
                //         return promise;
                //     },
                //     onUpload: async (file) => {
                //         const readImageAsBase64 = (file: File): Promise<{ alt: string; src: string }> => {
                //             return new Promise((resolve) => {
                //                 const reader = new FileReader();
                //                 reader.addEventListener(
                //                     'load',
                //                     () => {
                //                         resolve({
                //                             alt: file.name,
                //                             src: reader.result?.toString().split(',')[1] as string,
                //                         });
                //                     },
                //                     false,
                //                 );
                //                 reader.readAsDataURL(file);
                //             });
                //         };
                //         const { src: base64 } = await readImageAsBase64(file);
                //         const url = file.name;
                //         return url;
                //     },
                // },
            },
        });
        // useListener(crepe);
        const { editor } = crepe;
        // useUploader(editor);

        crepe.editor.use(commonmark);
        crepe.on(listener => {
            listener.markdownUpdated((ctx, markdown, prev_markdown) => {
                console.log(markdown);
            });
        })

        await crepe.create();

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

    update = (markdown: string): boolean => {
        if (!this.editor) return false;
        // const text = vscode.getState()?.text;
        const text = "";
        if (typeof markdown !== 'string' || text === markdown) return false;

        return this.editor.action((ctx) => {
            const view = ctx.get(editorViewCtx);
            const parser = ctx.get(parserCtx);

            const doc = parser(markdown);
            if (!doc) {
                return false;
            }
            const state = view.state;
            view.dispatch(state.tr.replace(0, state.doc.content.size, new Slice(doc.content, 0, 0)));
            // vscode.setState({ text: markdown });
            return true;
        });
    };
}
