import { createContext, useState } from "react"
import { iChemElement } from "./types/ChemElement.ts";
import { chemicalElementsList, chemicalElementsLUT } from "./components/Dataset.tsx";

import ChemElementPreviewArea from "./components/ChemElementPreviewArea/ChemElementPreviewArea.tsx";
import PeriodicTable from "./components/PeriodicTable/PeriodicTable.tsx";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css";


export const PreviewElementContext = createContext(chemicalElementsList[0]);

function App()
{
	const [previewElement, setPreviewElement] = useState(chemicalElementsList[0]);

	function onChemElementClick(chemEl: iChemElement)
	{
		setPreviewElement(chemEl);
	}

	return (
	<>
		<div>
			<a href="https://vitejs.dev" target="_blank">
				<img src={viteLogo} className="logo" alt="Vite logo" />
			</a>
			<a href="https://react.dev" target="_blank">
				<img src={reactLogo} className="logo react" alt="React logo" />
			</a>
		</div>

		<PreviewElementContext.Provider value={ previewElement }>
			<ChemElementPreviewArea></ChemElementPreviewArea>
		</PreviewElementContext.Provider>

		<PeriodicTable
			chemElements={chemicalElementsList}
			chemElementsLUT={chemicalElementsLUT}
			elementClickCb={onChemElementClick}>
		</PeriodicTable>
	</>
	)
}

export default App
