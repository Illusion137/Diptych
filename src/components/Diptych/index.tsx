import { useEffect, useRef, useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { EditorManager } from "./editor-manager";
import "./style/style.css";

const STORAGE_KEY = "everett_notes_path";

function basename(path: string): string {
	return path.split(/[\\/]/).pop() ?? path;
}

export default function Diptych() {
	const editor_ref = useRef<HTMLDivElement>(null);
	const managerRef = useRef<EditorManager | null>(null);
	const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [current_file_path, set_current_file_path] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));

	useEffect(() => {
		if (!current_file_path?.trim()) return;
		if (!editor_ref.current) return;

		const manager = new EditorManager();
		managerRef.current = manager;
		const on_change = (_: string) => {
			if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
			autosaveTimer.current = setTimeout(() => {
				const path = localStorage.getItem(STORAGE_KEY);
				if (path) manager.save_file(path);
			}, 800);
		};
		manager.create(editor_ref.current, on_change).then(async () => {
			const path = localStorage.getItem(STORAGE_KEY);
			if (path) {
				const content = await manager.load_file(path);
				if (content) manager.update(content);
			}
		});

		return () => {
			if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
			manager.destroy();
			managerRef.current = null;
		};
	}, [current_file_path]);

	const handle_open = async () => {
		const result = await open({
			multiple: false,
			filters: [{ name: "Markdown", extensions: ["md", "txt"] }],
		});
		if (!result) return;
		const path = result as string;
		localStorage.setItem(STORAGE_KEY, path);
		set_current_file_path(path);
		const manager = managerRef.current;
		if (!manager) return;
		const content = await manager.load_file(path);
		manager.update(content);
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "4px 12px",
					background: "var(--color-surface)",
					borderBottom: "1px solid var(--color-border)",
					flexShrink: 0,
				}}>
				<span
					style={{
						fontSize: "0.8rem",
						color: "var(--color-text-muted)",
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}>
					{current_file_path ? basename(current_file_path) : "No file"}
				</span>
				<button
					onClick={handle_open}
					style={{
						padding: "2px 10px",
						fontSize: "0.8rem",
						background: "var(--color-surface-elevated)",
						border: "1px solid var(--color-border)",
						color: "var(--color-text-muted)",
						borderRadius: "4px",
						cursor: "pointer",
						flexShrink: 0,
					}}>
					Open
				</button>
			</div>
			<div key={current_file_path} ref={editor_ref} style={{ flex: 1, overflow: "auto" }} />
		</div>
	);
}
