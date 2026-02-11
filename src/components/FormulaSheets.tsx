import "katex/dist/katex.min.css";
import "mathlive";
import React, { useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// Mock formula sheet files - replace with actual file loading logic
const mockFiles = [
	{
		id: 1,
		name: "Calculus Formulas",
		content: `# Calculus Formulas

## Derivatives

Basic derivative rules:

- Power rule: $\\frac{d}{dx}(x^n) = nx^{n-1}$
- Product rule: $(uv)' = u'v + uv'$
- Chain rule: $\\frac{d}{dx}f(g(x)) = f'(g(x)) \\cdot g'(x)$

## Integrals

$$
\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)
$$

$$
\\int e^x dx = e^x + C
$$

$$
\\int \\frac{1}{x} dx = \\ln|x| + C
$$
`,
	},
	{
		id: 2,
		name: "Linear Algebra",
		content: `# Linear Algebra Formulas

## Matrix Operations

Determinant of 2x2 matrix:

$$
\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc
$$

## Eigenvalues

Characteristic equation: $\\det(A - \\lambda I) = 0$

## Vector Operations

Dot product: $\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta$

Cross product magnitude: $|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta$
`,
	},
	{
		id: 3,
		name: "Physics Equations",
		content: `# Physics Equations

## Classical Mechanics

Newton's second law: $F = ma$

Kinetic energy: $KE = \\frac{1}{2}mv^2$

Potential energy (gravity): $PE = mgh$

## Electromagnetism

Coulomb's law:

$$
F = k\\frac{q_1q_2}{r^2}
$$

Electric field: $E = \\frac{F}{q}$

Ohm's law: $V = IR$
`,
	},
];

export const FormulaSheets: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<(typeof mockFiles)[0] | null>(null);
	const [fileSearchQuery, setFileSearchQuery] = useState("");
	const [contentSearchQuery, setContentSearchQuery] = useState("");
	const [fileSearchMode, setFileSearchMode] = useState<"text" | "math">("text");
	const [contentSearchMode, setContentSearchMode] = useState<"text" | "math">("text");
	const fileMathFieldRef = useRef<any>(null);
	const contentMathFieldRef = useRef<any>(null);

	// Normalize LaTeX for comparison (remove whitespace differences)
	const normalizeLaTeX = (latex: string) => {
		return latex.replace(/\s+/g, "").toLowerCase();
	};

	// Fuzzy search files by content (text or math)
	const filteredFiles = useMemo(() => {
		if (!fileSearchQuery.trim()) return mockFiles;

		const query = fileSearchQuery.toLowerCase();
		const normalizedQuery = normalizeLaTeX(fileSearchQuery);

		return mockFiles.filter((file) => {
			if (fileSearchMode === "text") {
				return file.name.toLowerCase().includes(query) || file.content.toLowerCase().includes(query);
			} else {
				// Math mode: search in LaTeX expressions
				const mathRegex = /\$\$?([\s\S]*?)\$\$?/g;
				let match;
				while ((match = mathRegex.exec(file.content)) !== null) {
					const mathContent = normalizeLaTeX(match[1]);
					if (mathContent.includes(normalizedQuery)) {
						return true;
					}
				}
				// Also check file name
				return file.name.toLowerCase().includes(query);
			}
		});
	}, [fileSearchQuery, fileSearchMode]);

	// Highlight search matches in content
	const highlightedContent = useMemo(() => {
		if (!selectedFile || !contentSearchQuery.trim()) return selectedFile?.content || "";

		const query = contentSearchQuery.toLowerCase();
		const normalizedQuery = normalizeLaTeX(contentSearchQuery);
		const content = selectedFile.content;

		if (contentSearchMode === "text") {
			// Simple text highlighting
			const lines = content.split("\n");
			const highlightedLines = lines.map((line) => {
				if (line.toLowerCase().includes(query)) {
					return `**${line}**`;
				}
				return line;
			});

			return highlightedLines.join("\n");
		} else {
			// Math mode: highlight lines with matching LaTeX
			const lines = content.split("\n");
			const highlightedLines = lines.map((line) => {
				const mathRegex = /\$\$?([\s\S]*?)\$\$?/g;
				let hasMatch = false;
				let match;
				while ((match = mathRegex.exec(line)) !== null) {
					const mathContent = normalizeLaTeX(match[1]);
					if (mathContent.includes(normalizedQuery)) {
						hasMatch = true;
						break;
					}
				}
				return hasMatch ? `**${line}**` : line;
			});

			return highlightedLines.join("\n");
		}
	}, [selectedFile, contentSearchQuery, contentSearchMode]);

	return (
		<div className="h-full w-full bg-white flex">
			{/* File list sidebar */}
			<div className="w-80 border-r border-gray-200 flex flex-col">
				<div className="p-4 border-b border-gray-200">
					<div className="flex gap-2 mb-2">
						<button
							onClick={() => setFileSearchMode("text")}
							className={`px-3 py-1 text-sm rounded ${fileSearchMode === "text" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
							Text
						</button>
						<button
							onClick={() => setFileSearchMode("math")}
							className={`px-3 py-1 text-sm rounded ${fileSearchMode === "math" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
							Math
						</button>
					</div>
					{fileSearchMode === "text" ? (
						<input
							type="text"
							placeholder="Search files..."
							value={fileSearchQuery}
							onChange={(e) => setFileSearchQuery(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					) : (
						<div className="border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
							<math-field ref={fileMathFieldRef} className="w-full" onInput={(e: any) => setFileSearchQuery(e.target.value)} style={{ border: "none", fontSize: "14px" }}>
								{fileSearchQuery}
							</math-field>
						</div>
					)}
				</div>
				<div className="flex-1 overflow-auto">
					{filteredFiles.map((file) => (
						<button
							key={file.id}
							onClick={() => {
								setSelectedFile(file);
								setContentSearchQuery("");
							}}
							className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
								selectedFile?.id === file.id ? "bg-blue-50 border-l-4 border-l-blue-600" : ""
							}`}>
							<div className="font-medium text-gray-800">{file.name}</div>
							<div className="text-sm text-gray-500 mt-1 line-clamp-2">{file.content.substring(0, 80)}...</div>
						</button>
					))}
					{filteredFiles.length === 0 && <div className="p-4 text-center text-gray-500">No files found</div>}
				</div>
			</div>

			{/* Content area */}
			<div className="flex-1 flex flex-col">
				{selectedFile ? (
					<>
						<div className="p-4 border-b border-gray-200 flex items-center gap-4">
							<button onClick={() => setSelectedFile(null)} className="text-gray-600 hover:text-gray-800">
								← Back to list
							</button>
							<div className="flex gap-2">
								<button
									onClick={() => setContentSearchMode("text")}
									className={`px-3 py-1 text-sm rounded ${contentSearchMode === "text" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
									Text
								</button>
								<button
									onClick={() => setContentSearchMode("math")}
									className={`px-3 py-1 text-sm rounded ${contentSearchMode === "math" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
									Math
								</button>
							</div>
							{contentSearchMode === "text" ? (
								<input
									type="text"
									placeholder="Search in document..."
									value={contentSearchQuery}
									onChange={(e) => setContentSearchQuery(e.target.value)}
									className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							) : (
								<div className="flex-1 border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
									<math-field ref={contentMathFieldRef} className="w-full" onInput={(e: any) => setContentSearchQuery(e.target.value)} style={{ border: "none", fontSize: "14px" }}>
										{contentSearchQuery}
									</math-field>
								</div>
							)}
						</div>
						<div className="flex-1 overflow-auto p-6">
							<div className="max-w-4xl mx-auto prose prose-slate">
								<ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
									{highlightedContent}
								</ReactMarkdown>
							</div>
						</div>
					</>
				) : (
					<div className="flex-1 flex items-center justify-center text-gray-500">Select a formula sheet from the list</div>
				)}
			</div>
		</div>
	);
};
