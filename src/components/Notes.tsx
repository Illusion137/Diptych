import katex from "katex";
import "katex/dist/katex.min.css";
import "mathlive";
import React, { useEffect, useRef, useState } from "react";

// WYSIWYG editor with inline math rendering
export const Notes: React.FC = () => {
	const [editingMath, setEditingMath] = useState<{
		element: HTMLElement;
		latex: string;
		isBlock: boolean;
	} | null>(null);

	const editorRef = useRef<HTMLDivElement>(null);
	const mathfieldRef = useRef<any>(null);

	// Initialize with some example content
	useEffect(() => {
		if (editorRef.current && !editorRef.current.innerHTML) {
			editorRef.current.innerHTML = `
        <h1>Welcome to Notes</h1>
        <p>Start typing your notes here! Math renders inline as you type.</p>
        <h2>Math Examples</h2>
        <p>To add math, use the buttons above or press <strong>Cmd+M</strong> (Mac) or <strong>Ctrl+M</strong> (Windows/Linux).</p>
        <ul>
          <li>Inline: Type text, then insert inline math</li>
          <li>Block: Insert block math for displayed equations</li>
        </ul>
        <p>Example inline math: <span class="math-inline" data-latex="E = mc^2"></span></p>
        <p>Example block math:</p>
        <div class="math-block" data-latex="\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}"></div>
        <div class="math-block" data-latex="\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"></div>
      `;
			renderAllMath();
		}
	}, []);

	// Keyboard shortcut handler
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Cmd+M (Mac) or Ctrl+M (Windows/Linux)
			if ((e.metaKey || e.ctrlKey) && e.key === "m") {
				e.preventDefault();
				insertMath(false); // Default to inline math
			}
			// Escape to close math editor
			if (e.key === "Escape" && editingMath) {
				setEditingMath(null);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [editingMath]);

	const renderAllMath = () => {
		if (!editorRef.current) return;

		// Render inline math
		const inlineMath = editorRef.current.querySelectorAll(".math-inline");
		inlineMath.forEach((el) => {
			const latex = el.getAttribute("data-latex") || "";
			try {
				katex.render(latex, el as HTMLElement, {
					throwOnError: false,
					displayMode: false,
				});
			} catch (e) {
				(el as HTMLElement).textContent = `[Math Error: ${latex}]`;
			}
		});

		// Render block math
		const blockMath = editorRef.current.querySelectorAll(".math-block");
		blockMath.forEach((el) => {
			const latex = el.getAttribute("data-latex") || "";
			try {
				katex.render(latex, el as HTMLElement, {
					throwOnError: false,
					displayMode: true,
				});
			} catch (e) {
				(el as HTMLElement).textContent = `[Math Error: ${latex}]`;
			}
		});
	};

	const handleEditorClick = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement;

		// Check if clicked on math element
		if (target.classList.contains("math-inline") || target.classList.contains("math-block")) {
			const latex = target.getAttribute("data-latex") || "";
			const isBlock = target.classList.contains("math-block");
			setEditingMath({
				element: target,
				latex: latex,
				isBlock: isBlock,
			});
		}
	};

	const insertMath = (isBlock: boolean) => {
		const selection = window.getSelection();
		if (!selection || !editorRef.current) return;

		const mathElement = document.createElement(isBlock ? "div" : "span");
		mathElement.className = isBlock ? "math-block" : "math-inline";
		mathElement.setAttribute("data-latex", "");
		mathElement.contentEditable = "false";
		mathElement.textContent = "[Empty math]";

		const range = selection.getRangeAt(0);
		range.deleteContents();
		range.insertNode(mathElement);

		// Add space after inline math for easier editing
		if (!isBlock) {
			const space = document.createTextNode("\u00A0");
			mathElement.after(space);
		}

		// Open editor for this new math element
		setEditingMath({
			element: mathElement,
			latex: "",
			isBlock: isBlock,
		});
	};

	const handleMathSave = () => {
		if (!editingMath || !mathfieldRef.current) return;

		const newLatex = mathfieldRef.current.value;
		editingMath.element.setAttribute("data-latex", newLatex);

		try {
			katex.render(newLatex, editingMath.element, {
				throwOnError: false,
				displayMode: editingMath.isBlock,
			});
		} catch (e) {
			editingMath.element.textContent = `[Math Error: ${newLatex}]`;
		}

		setEditingMath(null);
		editorRef.current?.focus();
	};

	const handleMathDelete = () => {
		if (!editingMath) return;
		editingMath.element.remove();
		setEditingMath(null);
		editorRef.current?.focus();
	};

	useEffect(() => {
		if (editingMath && mathfieldRef.current) {
			mathfieldRef.current.value = editingMath.latex;
			mathfieldRef.current.focus();
		}
	}, [editingMath]);

	return (
		<div className="h-full w-full bg-white flex flex-col">
			{/* Toolbar */}
			<div className="p-4 border-b border-gray-200 flex gap-2 items-center">
				<button onClick={() => insertMath(false)} className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-medium">
					+ Inline Math
				</button>
				<button onClick={() => insertMath(true)} className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-medium">
					+ Block Math
				</button>
				<div className="text-sm text-gray-500 ml-4">
					Click on math to edit • <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Cmd+M</kbd> to insert math
				</div>
			</div>

			{/* WYSIWYG Editor */}
			<div className="flex-1 overflow-auto">
				<div
					ref={editorRef}
					contentEditable
					onClick={handleEditorClick}
					className="max-w-4xl mx-auto p-8 focus:outline-none min-h-full"
					style={{
						lineHeight: "1.75",
						fontSize: "16px",
					}}
				/>
			</div>

			{/* MathLive editor panel - slides up from bottom */}
			<div
				className={`fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl transition-transform duration-300 ease-out ${
					editingMath ? "translate-y-0" : "translate-y-full"
				}`}
				style={{ zIndex: 50 }}>
				<div className="max-w-4xl mx-auto p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-800">{editingMath?.isBlock ? "Block Math" : "Inline Math"}</h3>
						<button onClick={() => setEditingMath(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
							×
						</button>
					</div>

					<div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
						<math-field
							ref={mathfieldRef}
							className="w-full text-2xl"
							style={{
								border: "none",
								padding: "8px",
								backgroundColor: "transparent",
							}}>
							{editingMath?.latex || ""}
						</math-field>
					</div>

					<div className="flex items-center justify-between">
						<div className="text-xs text-gray-500">
							Tip: Use <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded">^</kbd> for superscript,
							<kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded ml-1">_</kbd> for subscript,
							<kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded ml-1">/</kbd> for fractions
						</div>
						<div className="flex gap-2">
							<button onClick={handleMathDelete} className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded font-medium">
								Delete
							</button>
							<button onClick={() => setEditingMath(null)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded font-medium">
								Cancel
							</button>
							<button onClick={handleMathSave} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
								Save
							</button>
						</div>
					</div>
				</div>
			</div>

			<style>{`
        .math-inline {
          display: inline-block;
          cursor: pointer;
          padding: 2px 4px;
          margin: 0 2px;
          border-radius: 3px;
          transition: background-color 0.2s;
        }
        .math-inline:hover {
          background-color: #eff6ff;
        }
        .math-block {
          display: block;
          cursor: pointer;
          padding: 12px;
          margin: 16px 0;
          border-radius: 6px;
          text-align: center;
          transition: background-color 0.2s;
        }
        .math-block:hover {
          background-color: #eff6ff;
        }
        [contenteditable] h1 {
          font-size: 2em;
          font-weight: 600;
          margin: 0.67em 0;
        }
        [contenteditable] h2 {
          font-size: 1.5em;
          font-weight: 600;
          margin: 0.75em 0;
        }
        [contenteditable] h3 {
          font-size: 1.17em;
          font-weight: 600;
          margin: 1em 0;
        }
        [contenteditable] p {
          margin: 1em 0;
        }
        [contenteditable] ul, [contenteditable] ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        [contenteditable] strong {
          font-weight: 600;
        }
        [contenteditable] em {
          font-style: italic;
        }
        kbd {
          font-family: ui-monospace, monospace;
          font-size: 0.875em;
        }
      `}</style>
		</div>
	);
};
