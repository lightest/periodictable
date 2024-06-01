import { useContext, useEffect, useState } from "react";
import { chemicalElementsList, chemicalElementsLUT } from "../Dataset.tsx";
import { PreviewElementContext } from "../../App.tsx";

import ChemElementLarge from "../ChemElementLarge/ChemElementLarge.tsx";
import { iChemElement } from "../../types/iChemElement.ts";

interface iChemElementPreviewAreaProps
{
	chemEl: iChemElement,
	previewSetter: Function
}

export default function ChemElementPreviewArea({ chemEl: chemElProp, previewSetter }: iChemElementPreviewAreaProps)
{
	console.log("preview area render");
	// const previewElement = useContext(PreviewElementContext);
	const [searchVal, setSearchVal] = useState("");
	const [chemElPreview, setChemElPreview] = useState(chemElProp);
	console.log(chemElProp, chemElPreview);

	// useEffect(() =>
	// {
	// 	setChemElPreview(chemEl);
	// }, [chemEl]);

	function searchChemicalElement(searchVal = "")
	{
		let result = chemElProp;

		if (searchVal.length === 0)
		{
			return result;
		}

		const capitalizedSV = `${searchVal[0].toUpperCase()}${searchVal.substring(1).toLowerCase()}`;
		const lutResult = chemicalElementsLUT[searchVal] || chemicalElementsLUT[capitalizedSV];

		if (lutResult)
		{
			result = lutResult;
		}
		else
		{
			// TODO: add specific to parameters search
			// e.g. search by atomic mass.

			for (let i = 0; i < chemicalElementsList.length; i++)
			{
				const el = chemicalElementsList[i];
				const lcName = el.name.toLowerCase();

				if (el.name.includes(searchVal) || lcName.includes(searchVal))
				{
					result = chemicalElementsList[i];
					break;
				}
			}
		}

		return result;
	}

	function onSearchValChange(e)
	{
		console.log(e);
		const v = e.currentTarget.value;
		setSearchVal(v);

		const searchResult = searchChemicalElement(v);
		// setChemElPreview(chemEl);
		previewSetter(searchResult);
	}

	return (
		<>
			<input
				value={searchVal}
				onChange={onSearchValChange}/>

			<ChemElementLarge
				chemEl={chemElProp}>
			</ChemElementLarge>
		</>
	);
}
