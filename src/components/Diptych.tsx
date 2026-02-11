import React, { useState } from "react";
import { FormulaSheets } from "./FormulaSheets";
import { Notes } from "./Notes";

type View = "notes" | "formulas";

const Diptych: React.FC = () => {
	const [currentView, setCurrentView] = useState<View>("notes");

	const toggleView = () => {
		setCurrentView((prev) => (prev === "notes" ? "formulas" : "notes"));
	};

	return (
		<div className="w-screen bg-gray-50 flex flex-col">
			{/* Header with toggle button */}
			<div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
				<h1 className="text-xl font-semibold text-gray-800">{currentView === "notes" ? "Notes" : "Formula Sheets"}</h1>
				<button onClick={toggleView} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
					Switch to {currentView === "notes" ? "Formulas" : "Notes"}
				</button>
			</div>

			{/* Main content area with transition */}
			<div className="flex-1 overflow-hidden relative">
				<div
					className="absolute inset-0 transition-transform duration-300 ease-in-out"
					style={{
						transform: currentView === "notes" ? "translateX(0)" : "translateX(-100%)",
					}}>
					<Notes />
				</div>
				<div
					className="absolute inset-0 transition-transform duration-300 ease-in-out"
					style={{
						transform: currentView === "formulas" ? "translateX(0)" : "translateX(100%)",
					}}>
					<FormulaSheets />
				</div>
			</div>
		</div>
	);
};
export default Diptych;
