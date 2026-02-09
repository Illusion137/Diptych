import Fuse from "fuse.js";
import "katex/dist/katex.min.css"; // KaTeX CSS
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
// Removed Split import as it should not be in Diptych.tsx
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// Milkdown imports
import { rootCtx } from "@milkdown/core"; // Corrected Editor import and added rootCtx
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { createMilkdown } from "./Milk";

// Helper to convert common LaTeX commands to a more plaintext representation
const extract_plaintext_from_latex = (latex_string: string): string => {
	let plaintext = latex_string;

	// Remove math delimiters
	plaintext = plaintext.replace(/\$\$(.*?)\$\$/g, "$1"); // Block math
	plaintext = plaintext.replace(/\$(.*?)\$/g, "$1"); // Inline math

	// Replace common LaTeX commands with their English equivalents or simplified forms
	plaintext = plaintext.replace(/\\frac{(.*?)}{(.*?)}/g, "$1 over $2"); // \frac{A}{B} -> A over B
	plaintext = plaintext.replace(/\\sqrt{(.*?)}/g, "square root $1"); // \sqrt{A} -> square root A
	plaintext = plaintext.replace(/\\Delta/g, "Delta");
	plaintext = plaintext.replace(/\\cdot/g, "times");
	plaintext = plaintext.replace(/\\times/g, "times");
	plaintext = plaintext.replace(/\\sum/g, "sum");
	plaintext = plaintext.replace(/\\int/g, "integral");
	plaintext = plaintext.replace(/\\alpha/g, "alpha");
	plaintext = plaintext.replace(/\\beta/g, "beta");
	plaintext = plaintext.replace(/\\gamma/g, "gamma");
	plaintext = plaintext.replace(/\\theta/g, "theta");
	plaintext = plaintext.replace(/\\phi/g, "phi");
	plaintext = plaintext.replace(/\\mu/g, "mu");
	plaintext = plaintext.replace(/\\pi/g, "pi");
	plaintext = plaintext.replace(/\\sigma/g, "sigma");
	plaintext = plaintext.replace(/\\lambda/g, "lambda");
	plaintext = plaintext.replace(/\\text{(.*?)}/g, "$1"); // \text{text} -> text

	// Add spaces around replaced LaTeX commands
	plaintext = plaintext.replace(/\\([a-zA-Z]+)/g, " $1 ");

	// Replace subscripts and superscripts indicators with plain text description
	plaintext = plaintext.replace(/_([a-zA-Z0-9]+)/g, " subscript $1");
	plaintext = plaintext.replace(/\^([a-zA-Z0-9]+)/g, " superscript $1");
	plaintext = plaintext.replace(/^{(.*?)}/g, " superscript $1");
	plaintext = plaintext.replace(/_{(.*?)}/g, " subscript $1");

	// Clean up multiple spaces
	plaintext = plaintext.replace(/\s+/g, " ").trim();

	return plaintext;
};

// Helper function to load markdown files
async function load_markdown_files() {
	const modules = import.meta.glob("../formulas/**/*.md", {
		as: "raw",
		eager: true,
	});
	const files: { name: string; content: string; plaintext_content: string }[] = [];
	for (const path in modules) {
		const content = modules[path] as string;
		const name = path.replace("../formulas/", "").replace(".md", "").replace(/\//g, " - ");
		const plaintext_content = extract_plaintext_from_latex(content);
		files.push({ name, content, plaintext_content });
	}
	return files;
}

function MilkdownEditor({ initial_content, on_change }: { initial_content: string; on_change: (markdown: string) => void }) {
	const { get } = useEditor((root) => createMilkdown(root));

	useEffect(() => {
		const editor = get();
		// Apply basic styling to the Milkdown editor wrapper
		if (editor && editor.action) {
			editor.action((ctx) => {
				const editor_dom = ctx.get(rootCtx);
				if (editor_dom) {
					editor_dom.style.border = "1px solid #e2e8f0"; // border-gray-300
					editor_dom.style.borderRadius = "0.25rem"; // rounded
					editor_dom.style.padding = "0.5rem"; // p-2
					editor_dom.style.flexGrow = "1"; // flex-grow
					editor_dom.style.overflowY = "auto"; // overflow-y-auto
					editor_dom.style.minHeight = "500px"; // example min-height
					editor_dom.style.backgroundColor = "#121212"; // bg-white
				}
			});
		}
	}, [get]);

	return <Milkdown />;
}

function Diptych() {
	const [notes_content, set_notes_content] = useState<string>("");
	const [search_query, set_search_query] = useState<string>("");
	const [all_formula_files, set_all_formula_files] = useState<{ name: string; content: string; plaintext_content: string }[]>([]);
	const [displayed_formula_files, set_displayed_formula_files] = useState<{ name: string; content: string; plaintext_content: string }[]>([]);
	const [selected_formula, set_selected_formula] = useState<{ name: string; content: string; plaintext_content: string } | null>(null);

	useEffect(() => {
		const fetch_formulas = async () => {
			const formulas = await load_markdown_files();
			set_all_formula_files(formulas);
			set_displayed_formula_files(formulas); // Initially display all formula files
		};
		fetch_formulas();
	}, []);

	// Determine search keys based on whether query contains LaTeX indicators
	const get_search_keys = (query: string, is_file_search: boolean) => {
		const contains_latex_indicators = query.includes("\\") || query.includes("$");
		if (is_file_search) {
			return contains_latex_indicators ? ["name", "content"] : ["name", "plaintext_content"];
		} else {
			// Always search both content and plaintext_content when searching within a selected formula
			return ["plaintext_content", "content"];
		}
	};

	// Fuse instance for searching file names
	const file_name_fuse = useMemo(() => {
		const keys = get_search_keys(search_query, true);
		return new Fuse(all_formula_files, {
			keys,
			threshold: 0.6, // Increased threshold for fuzzier matches
			includeMatches: true,
			includeScore: true,
		});
	}, [all_formula_files, search_query]);

	// Fuse instance for searching within a selected formula's content
	const content_fuse = useMemo(() => {
		if (selected_formula) {
			const keys = get_search_keys(search_query, false);
			return new Fuse([selected_formula], {
				keys,
				threshold: 0.6, // Increased threshold for fuzzier matches
				includeMatches: true,
				includeScore: true,
			});
		}
		return null;
	}, [selected_formula, search_query]);

	useEffect(() => {
		if (search_query.trim() === "") {
			set_displayed_formula_files(all_formula_files);
		} else {
			if (selected_formula) {
				// Search within the selected formula's content
				if (content_fuse) {
					const results = content_fuse.search(search_query);
					set_displayed_formula_files(results.length > 0 ? [selected_formula] : []);
				} else {
					set_displayed_formula_files([]);
				}
			} else {
				// Search file names or their plaintext content
				const results = file_name_fuse.search(search_query);
				set_displayed_formula_files(results.map((result) => result.item));
			}
		}
	}, [search_query, all_formula_files, selected_formula, file_name_fuse, content_fuse]);

	return (
		<div className="diptych-container flex h-full">
			{/* Notes Section */}
			<div className="w-full p-4 border-r border-gray-300 overflow-y-auto flex flex-col">
				<h2 className="text-xl font-bold mb-4">Notes</h2>
				<MilkdownProvider>
					<MilkdownEditor initial_content={notes_content} on_change={set_notes_content} />
				</MilkdownProvider>
			</div>

			{/* Formulas Section */}
			<div className="w-full p-4 overflow-y-auto">
				<h2 className="text-xl font-bold mb-4">Formulas</h2>
				<input
					type="text"
					className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
					placeholder={selected_formula ? `Search within ${selected_formula.name}...` : "Search formula files..."}
					value={search_query}
					onChange={(e) => set_search_query(e.target.value)}
				/>

				{selected_formula && (
					<button
						className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						onClick={() => {
							set_selected_formula(null);
							set_search_query(""); // Clear search when going back to list
						}}>
						Back to list
					</button>
				)}

				<div className="formula-list">
					{selected_formula ? (
						// Display content of selected formula
						<div className="mb-6 pb-4 border-b border-gray-200">
							<h3 className="text-lg font-semibold mb-2">{selected_formula.name}</h3>
							<ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
								{selected_formula.content}
							</ReactMarkdown>
						</div>
					) : displayed_formula_files.length > 0 ? (
						// Display list of formula files
						displayed_formula_files.map((formula_file, index) => (
							<div key={index} className="mb-2 p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-100" onClick={() => set_selected_formula(formula_file)}>
								<h3 className="text-lg font-semibold">{formula_file.name}</h3>
							</div>
						))
					) : (
						<p className="text-gray-600">No formula files found.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Diptych;
