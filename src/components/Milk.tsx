// milkdown.ts
import { Editor, rootCtx } from "@milkdown/core";
import { math } from "@milkdown/plugin-math";
import { commonmark } from "@milkdown/preset-commonmark";

export const createMilkdown = (root: HTMLElement) =>
	Editor.make()
		.config((ctx) => {
			ctx.set(rootCtx, root);
		})
		.use(commonmark)
		.use(math);
