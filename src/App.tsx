import { createContext, useState, useCallback, useEffect } from "react";
import { iChemElement } from "./types/iChemElement.ts";
import { chemicalElementsList, chemicalElementsLUT } from "./components/Dataset.tsx";

import ChemElementPreviewArea from "./components/ChemElementPreviewArea/ChemElementPreviewArea.tsx";
import PeriodicTable from "./components/PeriodicTable/PeriodicTable.tsx";
import "./App.css";
import * as Networking from "./Networking.tsx";

window.Networking = Networking

export const PreviewElementContext = createContext(chemicalElementsList[0]);

function App()
{
	const [previewElement, setPreviewElement] = useState(chemicalElementsList[0]);

	function elementClickCb(chemEl: iChemElement)
	{
		console.log("elementClickCb", chemEl);
		setPreviewElement(chemEl);
	}

	console.log("App render");

	return (
	<>

		{/* <PreviewElementContext.Provider value={ previewElement }>
			<ChemElementPreviewArea></ChemElementPreviewArea>
		</PreviewElementContext.Provider> */}

		<ChemElementPreviewArea
			chemElProp={previewElement}
			previewSetter={setPreviewElement}>
		</ChemElementPreviewArea>

		<PeriodicTable
			className="periodic-table-app"
			chemElements={chemicalElementsList}
			chemElementsLUT={chemicalElementsLUT}
			// elementClickCb={onChemElementClick}>
			elementClickCb={elementClickCb}>
		</PeriodicTable>
	</>
	)
}

export default App
