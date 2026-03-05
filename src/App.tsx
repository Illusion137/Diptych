import { addStyles } from "react-mathquill";
import Split from "react-split";
import "./App.css";
import MathExpressionList from "./components/MathExpressionList";
import Diptych from "./components/Diptych";
import { is_tauri } from "./utils";

addStyles();

function App() {
	return (
		<div className="flex w-full h-[calc(100vh-4rem)]">
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
					className="split flex flex-row w-full h-full">
					<div className="math-expression-list-pane h-full overflow-auto">
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
