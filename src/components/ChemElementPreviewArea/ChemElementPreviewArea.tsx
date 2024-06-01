import { useContext, useEffect, useMemo, useState } from "react";
import { chemicalElementsList, chemicalElementsLUT } from "../Dataset.tsx";
import { PreviewElementContext } from "../../App.tsx";

import ChemElementLarge from "../ChemElementLarge/ChemElementLarge.tsx";
import { iChemElement } from "../../types/iChemElement.ts";

interface iChemElementPreviewAreaProps
{
	chemEl: iChemElement,
	previewSetter: Function
}

interface iElementData
{

};

async function fetchElementData(elementName: string)
{
	const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${elementName}`;
	let elementData:iElementData = {};

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

export default function ChemElementPreviewArea({ chemEl: chemElProp, previewSetter }: iChemElementPreviewAreaProps)
{
	console.log("preview area render");
	// const previewElement = useContext(PreviewElementContext);
	const [isLoading, setIsLoading] = useState(true);
	const [searchVal, setSearchVal] = useState("");
	const [chemElPreview, setChemElPreview] = useState(chemElProp);
	const [detailedElementData, setDetailedElementData] = useState({});
	console.log(chemElProp, chemElPreview);

	useEffect(() =>
	{
		async function requestData()
		{
			setIsLoading(true);
			const data = await fetchElementData(chemElProp.name);
			setDetailedElementData(data);
			setIsLoading(false);
		}

		requestData();
	}, [chemElProp]);


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

			{isLoading ? "" :
				<>
					<div className="img-container">
						<img src={detailedElementData.thumbnail.source}></img>
					</div>
				</>
			}
		</>
	);
}
