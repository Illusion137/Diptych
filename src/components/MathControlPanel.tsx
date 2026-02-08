import MathControlPanelFunctions from "./MathControlPanelFunctions";
import MathControlPanelKeyboard from "./MathControlPanelKeyboard";
import MathControlPanelMain from "./MathControlPanelMain";
import MathControlPanelSpecialKeyboard from "./MathControlPanelSpecialKeyboard";

type ControlPanelMode = "main" | "keyboard" | "special_keyboard" | "functions";

function GetControlPanelMode(props: { mode: ControlPanelMode }) {
	switch (props.mode) {
		case "main":
			return <MathControlPanelMain />;
		case "keyboard":
			return <MathControlPanelKeyboard />;
		case "special_keyboard":
			return <MathControlPanelSpecialKeyboard />;
		case "functions":
			return <MathControlPanelFunctions />;
	}
}

export default function MathControlPanel() {
	return (
		<div className="w-full h-full bg-gray-100 p-4">
			<div className="flex flex-row">
				<p>main</p>
				<p>abc</p>
				<p>αΔθλμ</p>
				<div>
					<p>RAD</p>
					<p>DEG</p>
				</div>
				<p>&lt;</p>
				<p>&gt;</p>
				<p>clear all</p>
				<p>settings</p>
			</div>
			<GetControlPanelMode mode="main" />
		</div>
	);
}
