import { useState } from "react"
import { planets, chemicalElementsList, chemicalElementsLUT } from "./components/Dataset.tsx";
import PlanetList from "./components/PlanetList.tsx";

import ChemElementPreviewArea from "./components/ChemElementPreviewArea/ChemElementPreviewArea.tsx";
import PeriodicTable from "./components/PeriodicTable/PeriodicTable.tsx";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css";

function App()
{
	const [previewElement, setPreviewElement] = useState(chemicalElementsList[0]);

	function onChemElementClick(chemEl)
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

		<ChemElementPreviewArea
			previewElement={previewElement}></ChemElementPreviewArea>

		<PeriodicTable
			chemElements={chemicalElementsList}
			chemElementLUT={chemicalElementsLUT}
			onChemElementClick={onChemElementClick}>
		</PeriodicTable>
	</>
	)
}

export default App
