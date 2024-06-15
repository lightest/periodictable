import { useContext, useEffect, useMemo, useState } from "react";
import { chemicalElementsList, chemicalElementsLUT, chemicalElementsLUTByAtomicNumber } from "../Dataset.tsx";
import ChemElementFull from "./ChemElementFull.tsx";
import { PreviewElementContext } from "../../App.tsx";

import ChemElementLarge from "../ChemElementLarge/ChemElementLarge.tsx";
import { iChemElement } from "../../types/iChemElement.ts";

import "./ChemElementPreviewArea.css"

interface iChemElementPreviewAreaProps
{
	chemElProp: iChemElement,
	previewSetter: Function
}

interface iThumbNail
{
	source: string
};

interface iElementData
{
	thumbnail: iThumbNail,
	extract: string
};

async function fetchElementData(elementName: string)
{
	const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${elementName}`;
	let elementData: iElementData = {};

	try
	{
		const resp = await fetch(url);
		elementData = await resp.json();
	}
	catch (err)
	{
		console.error();
	}

	console.log(elementData);

	return elementData;
}

export default function ChemElementPreviewArea({ chemElProp, previewSetter }: iChemElementPreviewAreaProps)
{
	console.log("preview area render");
	const [searchVal, setSearchVal] = useState<string>("");
	const [wikiElementData, setDetailedElementData] = useState<iElementData | {}>();

	console.log("current element data v", wikiElementData);

	useEffect(() =>
	{
		console.log(chemElProp);

		async function requestData()
		{
			console.log("fetching data");
			const data = await fetchElementData(chemElProp.name);
			setDetailedElementData(data);
		}

		requestData();
	}, [chemElProp]);

	function searchChemicalElement(searchVal = "")
	{
		let result = chemElProp;

		if (searchVal.length === 0)
		{
			return result;
		}

		const capitalizedSV = `${searchVal[0].toUpperCase()}${searchVal.substring(1).toLowerCase()}`;
		const lutResult = chemicalElementsLUT[searchVal] || chemicalElementsLUT[capitalizedSV] || chemicalElementsLUTByAtomicNumber[searchVal];

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
		previewSetter(searchResult);
	}

	return (
		<div className="preview-area-container">
			<input
				value={searchVal}
				onChange={onSearchValChange}/>

			<ChemElementFull
				chemElement={chemElProp}></ChemElementFull>
		</div>
	);
}
