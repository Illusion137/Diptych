import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { EditableMathField, StaticMathField, type MathField } from "react-mathquill";

export interface MathExpressionEditorHandle {
	focus: () => void;
}

interface MathExpressionEditorProps {
	initial_latex: string;
	initial_unit_latex?: string;
	is_focused: boolean;
	evaluated_result?: string | null;
	evaluation_error?: string | null;
	has_unit_from_evaluation?: boolean;
	is_deletable?: boolean; // Added
	on_latex_change: (latex: string) => void;
	on_unit_latex_change: (unit_latex: string) => void;
	on_enter_pressed: () => void;
	on_arrow_up: () => void;
	on_arrow_down: () => void;
	on_delete_pressed?: () => void; // Added
	on_backspace_pressed?: () => void; // Added
}

const MathExpressionEditor = forwardRef<MathExpressionEditorHandle, MathExpressionEditorProps>(
	(
		{
			initial_latex,
			initial_unit_latex,
			is_focused,
			evaluated_result,
			evaluation_error,
			has_unit_from_evaluation,
			is_deletable, // Destructured
			on_latex_change,
			on_unit_latex_change,
			on_enter_pressed,
			on_arrow_up,
			on_arrow_down,
			on_delete_pressed, // Destructured
			on_backspace_pressed, // Destructured
		},
		ref
	) => {
		const math_field_ref = useRef<MathField | null>(null);

		useImperativeHandle(ref, () => ({
			focus: () => {
				math_field_ref.current?.focus();
			},
		}));

		useEffect(() => {
			if (is_focused) {
				math_field_ref.current?.focus();
			}
		}, [is_focused]);

		const handle_key_down = (event: React.KeyboardEvent) => {
			if (event.key === "Enter") {
				event.preventDefault();
				on_enter_pressed();
			} else if (event.key === "ArrowUp") {
				event.preventDefault();
				on_arrow_up();
			} else if (event.key === "ArrowDown") {
				event.preventDefault();
				on_arrow_down();
			} else if (event.key === "Backspace" && is_deletable && math_field_ref?.current?.latex?.() === "") {
				event.preventDefault();
				on_backspace_pressed?.();
			}
		};

		return (
			<div className="flex items-center gap-3 p-2" onKeyDown={handle_key_down}>
				{/* Main editor */}
				<div
					className={`flex-1 transition-all duration-200 rounded-md py-3 px-4 text-lg border ${is_focused ? "border-blue-500 shadow-blue-300 shadow-md" : "border-gray-300"}`} // Tailwind for padding, border, and focus
					style={{
						minWidth: "200px",
					}}>
					<div>
						{" "}
						{/* Remove inline style, will be handled by parent's py-3 px-4 */}
						<EditableMathField
							mathquillDidMount={(mathField) => {
								math_field_ref.current = mathField;
							}}
							config={{
								spaceBehavesLikeTab: true,
								autoSubscriptNumerals: true,
								sumStartsWithNEquals: true,
								charsThatBreakOutOfSupSub: "+-=,",
								autoCommands: "pi theta sqrt sum int prod coprod nthroot alpha beta phi lambda sigma delta mu epsilon varepsilon Alpha Beta Phi Lambda Sigma Delta Mu Epsilon",
								autoOperatorNames: "ln sin cos tan sec csc cot log abs nCr nPr ciel fact floor round arcsin arccos arctan arcsec arccsc arccot",
								handlers: {
									edit: (mathField) => {
										on_latex_change(mathField?.latex?.());
									},
								},
							}}
							latex={initial_latex}
							// onChange is handled by handlers.edit
							onFocus={() => {}} // Focus managed by is_focused prop
							onBlur={() => {}} // Blur managed by is_focused prop
						/>
					</div>
				</div>

				{/* Result display */}
				<div className="flex-shrink-0" style={{ minWidth: "100px" }}>
					{evaluation_error ? (
						<div className="flex items-center gap-2 text-red-600 text-sm px-3 py-2 bg-red-50 rounded border border-red-200">
							<svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="truncate" title={evaluation_error}>
								Warning
							</span>
						</div>
					) : evaluated_result ? (
						<div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded border border-green-200">
							<span className="text-sm text-gray-700">=</span>
							<StaticMathField>{evaluated_result}</StaticMathField>
						</div>
					) : null}
				</div>

				{/* Unit input/display */}
				<div className="flex-shrink-0" style={{ minWidth: "80px" }}>
					{has_unit_from_evaluation ? (
						<div className="px-3 py-2 bg-gray-50 rounded border border-gray-200">
							<StaticMathField>{initial_unit_latex}</StaticMathField>
						</div>
					) : (
						<div className="rounded border border-gray-300 py-3 px-4 text-lg">
							<EditableMathField
								config={{
									spaceBehavesLikeTab: true,
									handlers: {
										edit: (mathField) => {
											on_unit_latex_change(mathField?.latex?.());
										},
									},
								}}
								latex={initial_unit_latex}
								// onChange is handled by handlers.edit
							/>
						</div>
					)}
				</div>
				{is_deletable && (
					<button
						type="button"
						onClick={on_delete_pressed}
						className="ml-2 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
						aria-label="Delete expression">
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
						</svg>
					</button>
				)}
			</div>
		);
	}
);

export default MathExpressionEditor;
