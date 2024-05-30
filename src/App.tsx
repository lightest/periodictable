import { createContext, useState, useCallback } from "react";
import { iChemElement } from "./types/iChemElement.ts";
import { chemicalElementsList, chemicalElementsLUT } from "./components/Dataset.tsx";

import ChemElementPreviewArea from "./components/ChemElementPreviewArea/ChemElementPreviewArea.tsx";
import PeriodicTable from "./components/PeriodicTable/PeriodicTable.tsx";
import "./App.css";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


export const PreviewElementContext = createContext(chemicalElementsList[0]);

function App()
{
	const [previewElement, setPreviewElement] = useState(chemicalElementsList[0]);

	console.log("App render");

	// function onChemElementClick(chemEl: iChemElement)
	// {
	// 	setPreviewElement(() => chemEl);
	// }

	const onChemElementClick = useCallback(
		function onChemElementClick(chemEl: iChemElement)
		{
			setPreviewElement(() => chemEl);
		},
		[]
	);

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

		{/* <PreviewElementContext.Provider value={ previewElement }>
			<ChemElementPreviewArea></ChemElementPreviewArea>
		</PreviewElementContext.Provider> */}

			<ChemElementPreviewArea chemEl={ previewElement }></ChemElementPreviewArea>

		<PeriodicTable
			chemElements={chemicalElementsList}
			chemElementsLUT={chemicalElementsLUT}
			elementClickCb={onChemElementClick}>
		</PeriodicTable>
	</>
	)
}

export default App
