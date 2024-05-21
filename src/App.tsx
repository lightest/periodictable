import { useState } from 'react'
import { planets, chemicalElementsList, chemicalElementsLUT } from "./components/Dataset.tsx";
import PlanetList from "./components/PlanetList.tsx";

import ChemElement from "./components/ChemElement/ChemElement.tsx";
import PeriodicTable from "./components/PeriodicTable/PeriodicTable.tsx";


import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App()
{
	const [count, setCount] = useState(0);
	const [searchVal, setSearchVal] = useState("");
	const [filteredPlanets, setFilteredPlanets] = useState(planets);

	function onSetCountClick()
	{
		setCount(count + 1);
	}

	function onSearchValChange(e)
	{
		console.log(e);
		const v = e.currentTarget.value;
		setSearchVal(v);

		let newFilteredPlanets = planets;

		if (v)
		{
			newFilteredPlanets = planets.filter(
				p => p.planet.toLowerCase().includes(v)
			);
		}

		setFilteredPlanets(newFilteredPlanets);
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

		<input
			value={searchVal}
			onChange={onSearchValChange}/>

		<PlanetList
			planets={filteredPlanets}>
		</PlanetList>

		<div className="card">
			<button onClick={onSetCountClick}>
			count is {count}
		</button>

		<p>
			Edit <code>src/App.tsx</code> and save to test HMR
		</p>
		</div>
		<p className="read-the-docs">
			Click on the Vite and React logos to learn more
		</p>

		<PeriodicTable
			chemElements={chemicalElementsList}
			chemElementLUT={chemicalElementsLUT}>
		</PeriodicTable>
	</>
	)
}

export default App
