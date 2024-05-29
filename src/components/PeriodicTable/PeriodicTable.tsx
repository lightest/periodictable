import "./PeriodicTable.css";
import { iChemElement } from "../../types/ChemElement.ts";
import ChemElement from "../ChemElement/ChemElement.tsx";

import { useState } from "react";

interface componentProps
{
	chemElements: iChemElement[],
	chemElementsLUT: Record<string, iChemElement>,
	elementClickCb: Function
}

export default function PeriodicTable({chemElements, elementClickCb}: componentProps)
{
	const [selectedElementAN, setSelectedElementAN] = useState(0);

	function onChemElementClick(chemEl: iChemElement)
	{
		setSelectedElementAN(chemEl.atomicNumber);

		if (typeof elementClickCb === "function")
		{
			elementClickCb(chemEl);
		}
	}

	const chemicalElementsList = chemElements.map((ce: iChemElement, idx: number) =>
		<ChemElement
			idx={idx}
			className={selectedElementAN === ce.atomicNumber ? "selected": ""}
			key={ce.atomicNumber}
			chemEl={ce}
			onClick={onChemElementClick}>
		</ChemElement>
	);

	return(
		<div className="periodic-table">{chemicalElementsList}</div>
	);
}
