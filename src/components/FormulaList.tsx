import { useState } from "react";
import { StaticMathField } from "react-mathquill";
import type { FormulaResult } from "../dimension_wasm_interface";

interface FormulaListProps {
	formulas: FormulaResult[];
	on_formula_pressed: (latex: string) => void;
}

export default function FormulaList({ formulas, on_formula_pressed }: FormulaListProps) {
	const [expanded, set_expanded] = useState<Set<string>>(new Set());

	if (formulas.length === 0) return null;

	function toggle_expanded(key: string, e: React.MouseEvent) {
		e.stopPropagation();
		set_expanded((prev) => {
			const next = new Set(prev);
			if (next.has(key)) next.delete(key);
			else next.add(key);
			return next;
		});
	}

	return (
		<div
			style={{
				marginTop: "12px",
				maxHeight: "280px",
				overflowY: "auto",
				display: "flex",
				flexDirection: "column",
				gap: "4px",
				paddingRight: "4px",
				scrollbarWidth: "thin",
				scrollbarColor: "var(--color-border) transparent",
			}}>
			{formulas.map((formula) => {
				const indent = formula.category === "---" ? 12 : formula.category === "------" ? 24 : 0;
				const key = formula.latex;
				const is_expanded = expanded.has(key);

				return (
					<div key={key} style={{ marginLeft: indent }}>
						<div
							style={{
								background: "var(--color-surface-elevated)",
								border: "1px solid var(--color-border)",
								borderLeft: "3px solid var(--color-primary)",
								borderRadius: "5px",
								overflow: "hidden",
								cursor: "pointer",
								transition: "background 0.12s, box-shadow 0.12s",
							}}
							onMouseEnter={(e) => {
								(e.currentTarget as HTMLDivElement).style.background = "var(--color-surface)";
								(e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 8px var(--color-primary)";
							}}
							onMouseLeave={(e) => {
								(e.currentTarget as HTMLDivElement).style.background = "var(--color-surface-elevated)";
								(e.currentTarget as HTMLDivElement).style.boxShadow = "none";
							}}
							onClick={() => on_formula_pressed(formula.latex)}>
							{/* Main row */}
							<div
								style={{
									padding: "5px 10px",
									display: "flex",
									alignItems: "center",
									gap: "10px",
									minHeight: "36px",
								}}>
								{/* Name */}
								<span
									style={{
										color: "var(--color-accent)",
										fontSize: "0.78rem",
										fontWeight: 600,
										whiteSpace: "nowrap",
										minWidth: "80px",
										flexShrink: 0,
									}}>
									{formula.name}
								</span>

								{/* Formula latex */}
								<div style={{ flexShrink: 0 }}>
									<StaticMathField>{formula.latex}</StaticMathField>
								</div>

								{/* Variables: compact inline list */}
								{!is_expanded && formula.variables.length > 0 && (
									<div
										style={{
											display: "flex",
											flexWrap: "wrap",
											gap: "4px 8px",
											marginLeft: "auto",
											alignItems: "center",
										}}>
										{formula.variables.map((variable) => (
											<span
												key={formula.name + variable.name}
												title={variable.description}
												style={{
													color: "var(--color-text-muted)",
													fontSize: "0.72rem",
													whiteSpace: "nowrap",
												}}>
												<StaticMathField>{`\\mathrm{${variable.name}}\\left(${variable.units}\\right)`}</StaticMathField>
											</span>
										))}
									</div>
								)}

								{/* Expand toggle */}
								{formula.variables.length > 0 && (
									<button
										onClick={(e) => toggle_expanded(key, e)}
										style={{
											marginLeft: is_expanded ? "auto" : "8px",
											flexShrink: 0,
											background: "none",
											border: "none",
											padding: "2px 4px",
											cursor: "pointer",
											color: "var(--color-text-muted)",
											fontSize: "0.7rem",
											lineHeight: 1,
											borderRadius: "3px",
											transition: "color 0.15s",
										}}
										title={is_expanded ? "Collapse" : "Expand variables"}>
										{is_expanded ? "▲" : "▼"}
									</button>
								)}
							</div>

							{/* Expanded variable details */}
							{is_expanded && formula.variables.length > 0 && (
								<div
									style={{
										borderTop: "1px solid var(--color-border)",
										padding: "6px 10px 8px 10px",
										display: "flex",
										flexDirection: "column",
										gap: "4px",
									}}>
									{formula.variables.map((variable) => (
										<div
											key={formula.name + variable.name}
											style={{
												display: "flex",
												alignItems: "baseline",
												gap: "8px",
											}}>
											<span style={{ flexShrink: 0 }}>
												<StaticMathField>{`\\mathrm{${variable.name}}\\left(${variable.units}\\right)`}</StaticMathField>
											</span>
											{variable.description && (
												<span
													style={{
														color: "var(--color-text-muted)",
														fontSize: "0.72rem",
													}}>
													— {variable.description}
												</span>
											)}
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
