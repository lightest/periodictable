import { useState, useMemo, memo, useCallback } from "react";

import "./PeriodicTable.css";
import { iChemElement } from "../../types/iChemElement.ts";
import ChemElement from "../ChemElement/ChemElement.tsx";

interface componentProps
{
	chemElements: iChemElement[],
	chemElementsLUT: Record<string, iChemElement>,
	elementClickCb: Function
}

const PeriodicTable = memo(function PeriodicTable({ chemElements, elementClickCb }: componentProps)
{
	const [selectedElementAN, setSelectedElementAN] = useState(0);

	const onChemElementClick = useCallback(function onChemElementClick(chemEl: iChemElement)
		{
			setSelectedElementAN(chemEl.atomicNumber);

			if (typeof elementClickCb === "function")
			{
				elementClickCb(chemEl);
			}
		},
		[]
	);

	const chemicalElementsList = useMemo(() => chemElements.map((ce: iChemElement, idx: number) =>
		<ChemElement
			idx={idx}
			// className={selectedElementAN === ce.atomicNumber ? "selected" : ""}
			className=""
			key={ce.atomicNumber}
			chemEl={ce}
			onClick={onChemElementClick}>
		</ChemElement>
	), []);

	return (
		<div className="periodic-table">{chemicalElementsList}</div>
	);
});

export default PeriodicTable;
