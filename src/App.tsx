import { useState } from "react";
import { addStyles } from "react-mathquill";
import Split from "react-split";
import "./App.css";
import MathExpressionList from "./components/MathExpressionList";
import Diptych from "./components/Diptych";
import { is_tauri } from "./utils";

addStyles();

function App() {
	const [is_swapped, set_is_swapped] = useState(false);

	return (
		<div className="relative flex w-full h-[calc(100vh-4rem)]">
			{is_tauri && (
				<button
					onClick={() => set_is_swapped((s) => !s)}
					style={{
						position: "absolute",
						top: "-2rem",
						right: "-0.5rem",
						zIndex: 50,
						padding: "0.25rem 0.5rem",
						fontSize: "1rem",
						background: "var(--color-surface-elevated)",
						border: "1px solid var(--color-border)",
						color: "var(--color-text-muted)",
						borderRadius: "6px",
						cursor: "pointer",
						lineHeight: 1,
					}}
					title="Swap panes">
					↔
				</button>
			)}
			{is_tauri ? (
				<Split
					sizes={[50, 50]}
					minSize={100}
					expandToMin={false}
					gutterSize={10}
					gutterAlign="center"
					snapOffset={30}
					dragInterval={1}
					direction="horizontal"
					cursor="col-resize"
					className={`split flex ${is_swapped ? "flex-row-reverse" : "flex-row"} w-full h-full`}>
					<div className="math-expression-list-pane h-full overflow-auto px-4 py-2">
						<MathExpressionList />
					</div>
					<div className="diptych-pane h-full overflow-auto">
						<Diptych />
					</div>
				</Split>
			) : (
				<MathExpressionList />
			)}
		</div>
	);
}

export default App;
