import { useContext, useEffect, useMemo, useState } from "react";

import ChemElementLarge from "../ChemElementLarge/ChemElementLarge.tsx";
import { iChemElement } from "../../types/iChemElement.ts";

import "./ChemElementFull.css";

interface iChemElementFullProps
{
	chemElement: iChemElement,
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

export default function ChemElementFull({ chemElement }: iChemElementFullProps)
{
	const [wikiElementData, setDetailedElementData] = useState<iElementData | {}>();
	console.log("current element data wiki", wikiElementData);

	useEffect(() =>
	{
		async function requestData()
		{
			console.log("fetching data");
			const data = await fetchElementData(chemElement.name);
			setDetailedElementData(data);
		}

		requestData();
	}, [chemElement]);

	return (
		<>
			<div className="chem-element-full">
				{/* TODO: rename this. */}
				<div class="data-row">
					<ChemElementLarge
						chemEl={chemElement}>
					</ChemElementLarge>

					<div className="img-container">
						{wikiElementData && wikiElementData.thumbnail &&
							<img src={wikiElementData.thumbnail.source}></img>
						}
					</div>
				</div>

				{wikiElementData &&
					<div className="element-description">
						{wikiElementData.extract}
					</div>
				}
			</div>
		</>
	);
}
