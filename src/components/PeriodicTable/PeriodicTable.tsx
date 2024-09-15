import { useState, useMemo, memo, useCallback, useEffect, useRef } from "react";

import "./PeriodicTable.css";
import { iChemElement } from "../../types/iChemElement.ts";
import ChemElement from "../ChemElement/ChemElement.tsx";

interface componentProps
{
	className: string,
	chemElements: iChemElement[],
	chemElementsLUT: Record<string, iChemElement>,
	elementClickCb: Function
}


const PeriodicTable = memo(function PeriodicTable({ chemElements, elementClickCb, className }: componentProps)
{
	const chemElRef = useRef(null);
	const [selectedElementAN, setSelectedElementAN] = useState(0);
	const [draggedElement, setDraggedElement] = useState<iChemElement | null>(null);

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

	function onChemElementMousedown(e: iChemElement)
	{
		setDraggedElement(e)
	}

	function onMousemove(e)
	{
		if (draggedElement)
		{
			e.preventDefault();
			const chemElDOM = chemElRef.current;
			if (!chemElDOM)
			{
				return;
			}

			chemElDOM.style.left = `${e.clientX}px`;
			chemElDOM.style.top = `${e.clientY}px`;
		}
	}

	function onMouseup()
	{
		setDraggedElement(null);
	}

	function addEventListeners()
	{
		window.addEventListener("mousemove", onMousemove);
		window.addEventListener("mouseup", onMouseup);
	}

	function removeEventListeners()
	{
		window.removeEventListener("mousemove", onMousemove);
		window.removeEventListener("mouseup", onMouseup);
	}

	useEffect(() =>
	{
		addEventListeners();
		return () =>
		{
			removeEventListeners();
		}
	});

	const chemicalElementsList = useMemo(() => chemElements.map((ce: iChemElement, idx: number) =>
		<ChemElement
			idx={idx}
			// className={selectedElementAN === ce.atomicNumber ? "selected" : ""}
			className=""
			key={ce.atomicNumber}
			chemEl={ce}
			onMousedown={onChemElementMousedown}
			onClick={onChemElementClick}>
		</ChemElement>
	), []);

	return (
		<>
			{draggedElement ?
				<ChemElement
					ref={chemElRef}
					className="dragged-element"
					chemEl={draggedElement}>
				</ChemElement>
			: "" }
			<div className={`periodic-table ${className}`}>{chemicalElementsList}</div>
		</>
	);
});

export default PeriodicTable;
