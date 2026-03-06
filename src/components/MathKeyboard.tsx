import { useState } from "react";

export type KeyAction = { type: "write"; latex: string } | { type: "cmd"; latex: string } | { type: "keystroke"; key: string } | { type: "typedText"; text: string };

export interface MathKeyboardProps {
	on_key_press: (action: KeyAction) => void;
}

type Tab = "Main" | "Letters" | "Greek" | "Functions";

const MAIN_KEYS: Array<{ label: string; action: KeyAction }> = [
	// Row 1
	{ label: "(", action: { type: "typedText", text: "\\left(" } },
	{ label: ")", action: { type: "typedText", text: "\\right)" } },
	{ label: "^", action: { type: "typedText", text: "^" } },
	{ label: "√", action: { type: "cmd", latex: "\\sqrt" } },
	{ label: "⌫", action: { type: "keystroke", key: "Backspace" } },
	// Row 2
	{ label: "7", action: { type: "typedText", text: "7" } },
	{ label: "8", action: { type: "typedText", text: "8" } },
	{ label: "9", action: { type: "typedText", text: "9" } },
	{ label: "÷", action: { type: "cmd", latex: "\\div" } },
	{ label: "π", action: { type: "cmd", latex: "\\pi" } },
	// Row 3
	{ label: "4", action: { type: "typedText", text: "4" } },
	{ label: "5", action: { type: "typedText", text: "5" } },
	{ label: "6", action: { type: "typedText", text: "6" } },
	{ label: "×", action: { type: "cmd", latex: "\\times" } },
	{ label: "a/b", action: { type: "cmd", latex: "\\frac" } },
	// Row 4
	{ label: "1", action: { type: "typedText", text: "1" } },
	{ label: "2", action: { type: "typedText", text: "2" } },
	{ label: "3", action: { type: "typedText", text: "3" } },
	{ label: "−", action: { type: "typedText", text: "-" } },
	{ label: "Σ", action: { type: "cmd", latex: "\\sum" } },
	// Row 5
	{ label: "0", action: { type: "typedText", text: "0" } },
	{ label: ".", action: { type: "typedText", text: "." } },
	{ label: "=", action: { type: "typedText", text: "=" } },
	{ label: "+", action: { type: "typedText", text: "+" } },
	{ label: "∫", action: { type: "cmd", latex: "\\int" } },
];

const LETTER_KEYS: Array<{ label: string; action: KeyAction }> = [
	..."abcdefghijklmnopqrstuvwxyz".split("").map((c) => ({ label: c, action: { type: "typedText" as const, text: c } })),
	..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => ({ label: c, action: { type: "typedText" as const, text: c } })),
];

const GREEK_KEYS: Array<{ label: string; action: KeyAction }> = [
	{ label: "α", action: { type: "cmd", latex: "\\alpha" } },
	{ label: "β", action: { type: "cmd", latex: "\\beta" } },
	{ label: "γ", action: { type: "cmd", latex: "\\gamma" } },
	{ label: "δ", action: { type: "cmd", latex: "\\delta" } },
	{ label: "ε", action: { type: "cmd", latex: "\\epsilon" } },
	{ label: "ζ", action: { type: "cmd", latex: "\\zeta" } },
	{ label: "η", action: { type: "cmd", latex: "\\eta" } },
	{ label: "θ", action: { type: "cmd", latex: "\\theta" } },
	{ label: "κ", action: { type: "cmd", latex: "\\kappa" } },
	{ label: "λ", action: { type: "cmd", latex: "\\lambda" } },
	{ label: "μ", action: { type: "cmd", latex: "\\mu" } },
	{ label: "ν", action: { type: "cmd", latex: "\\nu" } },
	{ label: "ξ", action: { type: "cmd", latex: "\\xi" } },
	{ label: "π", action: { type: "cmd", latex: "\\pi" } },
	{ label: "ρ", action: { type: "cmd", latex: "\\rho" } },
	{ label: "σ", action: { type: "cmd", latex: "\\sigma" } },
	{ label: "τ", action: { type: "cmd", latex: "\\tau" } },
	{ label: "υ", action: { type: "cmd", latex: "\\upsilon" } },
	{ label: "φ", action: { type: "cmd", latex: "\\phi" } },
	{ label: "χ", action: { type: "cmd", latex: "\\chi" } },
	{ label: "ψ", action: { type: "cmd", latex: "\\psi" } },
	{ label: "ω", action: { type: "cmd", latex: "\\omega" } },
	{ label: "Γ", action: { type: "cmd", latex: "\\Gamma" } },
	{ label: "Δ", action: { type: "cmd", latex: "\\Delta" } },
	{ label: "Θ", action: { type: "cmd", latex: "\\Theta" } },
	{ label: "Λ", action: { type: "cmd", latex: "\\Lambda" } },
	{ label: "Π", action: { type: "cmd", latex: "\\Pi" } },
	{ label: "Σ", action: { type: "cmd", latex: "\\Sigma" } },
	{ label: "Φ", action: { type: "cmd", latex: "\\Phi" } },
	{ label: "Ψ", action: { type: "cmd", latex: "\\Psi" } },
	{ label: "Ω", action: { type: "cmd", latex: "\\Omega" } },
];

// All functions from the README
const FUNCTION_KEYS: Array<{ label: string; action: KeyAction }> = [
	{ label: "sin", action: { type: "write", latex: "\\sin\\left(\\right)" } },
	{ label: "cos", action: { type: "write", latex: "\\cos\\left(\\right)" } },
	{ label: "tan", action: { type: "write", latex: "\\tan\\left(\\right)" } },
	{ label: "sec", action: { type: "write", latex: "\\sec\\left(\\right)" } },
	{ label: "csc", action: { type: "write", latex: "\\csc\\left(\\right)" } },
	{ label: "cot", action: { type: "write", latex: "\\cot\\left(\\right)" } },
	{ label: "arcsin", action: { type: "write", latex: "\\arcsin\\left(\\right)" } },
	{ label: "arccos", action: { type: "write", latex: "\\arccos\\left(\\right)" } },
	{ label: "arctan", action: { type: "write", latex: "\\arctan\\left(\\right)" } },
	{ label: "arcsec", action: { type: "write", latex: "\\arcsec\\left(\\right)" } },
	{ label: "arccsc", action: { type: "write", latex: "\\arccsc\\left(\\right)" } },
	{ label: "arccot", action: { type: "write", latex: "\\arccot\\left(\\right)" } },
	{ label: "ln", action: { type: "write", latex: "\\ln\\left(\\right)" } },
	{ label: "log", action: { type: "write", latex: "\\log\\left(\\right)" } },
	{ label: "abs", action: { type: "write", latex: "\\operatorname{abs}\\left(\\right)" } },
	{ label: "ceil", action: { type: "write", latex: "\\operatorname{ceil}\\left(\\right)" } },
	{ label: "floor", action: { type: "write", latex: "\\operatorname{floor}\\left(\\right)" } },
	{ label: "round", action: { type: "write", latex: "\\operatorname{round}\\left(\\right)" } },
	{ label: "fact", action: { type: "write", latex: "\\operatorname{fact}\\left(\\right)" } },
	{ label: "sqrt", action: { type: "cmd", latex: "\\sqrt" } },
	{ label: "nCr", action: { type: "write", latex: "\\operatorname{nCr}\\left(\\right)" } },
	{ label: "nPr", action: { type: "write", latex: "\\operatorname{nPr}\\left(\\right)" } },
	{ label: "min", action: { type: "write", latex: "\\operatorname{min}\\left(\\right)" } },
	{ label: "max", action: { type: "write", latex: "\\operatorname{max}\\left(\\right)" } },
	{ label: "gcd", action: { type: "write", latex: "\\operatorname{gcd}\\left(\\right)" } },
	{ label: "lcm", action: { type: "write", latex: "\\operatorname{lcm}\\left(\\right)" } },
	{ label: "sum", action: { type: "cmd", latex: "\\sum" } },
	{ label: "int", action: { type: "cmd", latex: "\\int" } },
	{ label: "prod", action: { type: "cmd", latex: "\\prod" } },
	{ label: "sig", action: { type: "write", latex: "\\operatorname{sig}\\left(\\right)" } },
	{ label: "det", action: { type: "write", latex: "\\operatorname{det}\\left(\\right)" } },
	{ label: "conj", action: { type: "write", latex: "\\operatorname{conj}\\left(\\right)" } },
	{ label: "val", action: { type: "write", latex: "\\operatorname{val}\\left(\\right)" } },
	{ label: "unit", action: { type: "write", latex: "\\operatorname{unit}\\left(\\right)" } },
	{ label: "Re", action: { type: "write", latex: "\\operatorname{Re}\\left(\\right)" } },
	{ label: "Im", action: { type: "write", latex: "\\operatorname{Im}\\left(\\right)" } },
	{ label: "trace", action: { type: "write", latex: "\\operatorname{trace}\\left(\\right)" } },
	{ label: "FahrC", action: { type: "write", latex: "\\operatorname{FahrC}\\left(\\right)" } },
	{ label: "FahrK", action: { type: "write", latex: "\\operatorname{FahrK}\\left(\\right)" } },
	{ label: "CelK", action: { type: "write", latex: "\\operatorname{CelK}\\left(\\right)" } },
	{ label: "CelF", action: { type: "write", latex: "\\operatorname{CelF}\\left(\\right)" } },
	{ label: "rad", action: { type: "write", latex: "\\operatorname{rad}\\left(\\right)" } },
	{ label: "deg", action: { type: "write", latex: "\\operatorname{deg}\\left(\\right)" } },
];

const TABS: Tab[] = ["Main", "Letters", "Greek", "Functions"];

function get_keys(tab: Tab) {
	switch (tab) {
		case "Main":
			return MAIN_KEYS;
		case "Letters":
			return LETTER_KEYS;
		case "Greek":
			return GREEK_KEYS;
		case "Functions":
			return FUNCTION_KEYS;
	}
}

function get_grid_cols(tab: Tab) {
	switch (tab) {
		case "Main":
			return "grid-cols-5";
		case "Letters":
			return "grid-cols-9";
		case "Greek":
			return "grid-cols-8";
		case "Functions":
			return "grid-cols-6";
	}
}

export default function MathKeyboard({ on_key_press }: MathKeyboardProps) {
	const [active_tab, set_active_tab] = useState<Tab>("Main");

	const keys = get_keys(active_tab);
	const grid_cols = get_grid_cols(active_tab);

	return (
		<div
			style={{
				background: "var(--color-surface)",
				border: "1px solid var(--color-border)",
				borderRadius: "8px",
				padding: "12px",
				marginTop: "16px",
			}}>
			{/* Tab bar */}
			<div
				style={{
					display: "flex",
					borderBottom: "1px solid var(--color-border)",
					marginBottom: "10px",
				}}>
				{TABS.map((tab) => (
					<button
						key={tab}
						onMouseDown={(e) => {
							e.preventDefault();
							set_active_tab(tab);
						}}
						style={{
							background: "transparent",
							border: "none",
							borderBottom: active_tab === tab ? "2px solid var(--color-primary)" : "2px solid transparent",
							color: active_tab === tab ? "var(--color-accent)" : "var(--color-text-muted)",
							padding: "6px 16px",
							fontSize: "0.875rem",
							fontWeight: active_tab === tab ? 600 : 400,
							cursor: "pointer",
							borderRadius: 0,
							transition: "color 0.15s, border-color 0.15s",
						}}>
						{tab}
					</button>
				))}
			</div>

			{/* Key grid */}
			<div className={`grid ${grid_cols} gap-1.5`}>
				{keys.map((key, i) => (
					<button
						key={i}
						onMouseDown={(e) => {
							e.preventDefault();
							on_key_press(key.action);
						}}
						style={{
							background: "var(--color-surface-elevated)",
							border: "1px solid var(--color-border)",
							color: "var(--color-text)",
							borderRadius: "3px",
							padding: "8px 4px",
							fontSize: "0.9rem",
							cursor: "pointer",
							transition: "background 0.15s, box-shadow 0.15s",
							minWidth: 0,
						}}
						onMouseEnter={(e) => {
							(e.currentTarget as HTMLButtonElement).style.background = "var(--color-primary-dim)";
							(e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 6px var(--color-primary)";
						}}
						onMouseLeave={(e) => {
							(e.currentTarget as HTMLButtonElement).style.background = "var(--color-surface-elevated)";
							(e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
						}}>
						{key.label}
					</button>
				))}
			</div>
		</div>
	);
}
