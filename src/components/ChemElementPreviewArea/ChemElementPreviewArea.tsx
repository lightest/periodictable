import { useContext, useState } from "react";
import { chemicalElementsList, chemicalElementsLUT } from "../Dataset.tsx";
import { PreviewElementContext } from "../../App.tsx";

import ChemElementLarge from "../ChemElementLarge/ChemElementLarge.tsx";


export default function ChemElementPreviewArea()
{
	const [searchVal, setSearchVal] = useState("");
	const [chemElPreview, setChemElPreview] = useState(chemicalElementsLUT.Li);
	const previewElement = useContext(PreviewElementContext);

	function searchChemicalElement(searchVal = "")
	{
		let result = chemicalElementsList[0];

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

		const chemEl = searchChemicalElement(v);
		setChemElPreview(chemEl);
	}

	return (
		<>
			<input
				value={searchVal}
				onChange={onSearchValChange}/>

			<ChemElementLarge
				chemEl={previewElement}>
			</ChemElementLarge>
		</>
	);
}
