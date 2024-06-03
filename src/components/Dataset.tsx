import dataset from "../../data/PubChemElements_all.json";
import { iChemElement } from "../types/iChemElement";

const COLUMN_NAMES_REMAP = {
	"AtomicNumber": "atomicNumber",
	"Symbol": "symbol",
	"Name": "name",
	"AtomicMass": "atomicMass",
	"CPKHexColor": "hexColor",
	"ElectronConfiguration": "electronConfiguration",
	"Electronegativity": "electronegativity",
	"AtomicRadius": "atomicRadius",
	"IonizationEnergy": "ionizationEnergy",
	"ElectronAffinity": "electronAffinity",
	"OxidationStates": "oxidationStates",
	"StandardState": "standardState",
	"MeltingPoint": "meltingPoint",
	"BoilingPoint": "boilingPoint",
	"Density": "density",
	"GroupBlock": "group",
	"YearDiscovered": "yearDiscovered",
};

const ELEMENT_GROUP_TO_CSS_CLASS: Record<string, string> =
{
	"Nonmetal": "nonmetal",
	"Noble gas": "noble-gas",
	"Halogen": "halogen",
	"Alkali metal": "alkali-metal",
	"Alkaline earth metal": "alkaline-earth-metal",
	"Metalloid": "metalloid",
	"Transition metal": "transition-metal",
	"Post-transition metal": "post-transition-metal",
	"Lanthanide": "lanthanide",
	"Actinide": "actinide"
};

function processDataset(dataset, fields:any[] = [])
{
	const t = performance.now();
	const cols = dataset.Table.Columns.Column;
	const elementsData = dataset.Table.Row;
	const chemicalElementsList: iChemElement[] = new Array(elementsData.length);
	const chemicalElementsLUT: Record<string, iChemElement> = {};
	const chemicalElementsLUTByAtomicNumber: Record<string, iChemElement> = {};
	const dataKeysToIndices = {};

	for (let i = 0; i < cols.length; i++)
	{
		dataKeysToIndices[cols[i]] = i;
	}

	for (let i = 0; i < elementsData.length; i++)
	{
		chemicalElementsList[i] = {};

		for (let j = 0; j < fields.length; j++)
		{
			const fieldName = fields[j];
			const localFieldName = COLUMN_NAMES_REMAP[fieldName] || fieldName;
			const dataIdx = dataKeysToIndices[fieldName];
			chemicalElementsList[i][localFieldName] = elementsData[i].Cell[dataIdx];
		}

		chemicalElementsLUT[chemicalElementsList[i].symbol] = chemicalElementsList[i];
		chemicalElementsLUTByAtomicNumber[chemicalElementsList[i].atomicNumber] = chemicalElementsList[i];
	}

	console.log("Data processing took:", performance.now() - t);

	return {
		chemicalElementsList,
		chemicalElementsLUT,
		chemicalElementsLUTByAtomicNumber
	};
}

const {
	chemicalElementsList,
	chemicalElementsLUT,
	chemicalElementsLUTByAtomicNumber
} = processDataset(
	dataset,
	[
		"AtomicNumber",
		"AtomicMass",
		"ElectronConfiguration",
		"Symbol",
		"GroupBlock",
		"Name",
		"CPKHexColor"
	]
);

console.log(chemicalElementsLUT);

export {
	chemicalElementsList,
	chemicalElementsLUT,
	chemicalElementsLUTByAtomicNumber,
	ELEMENT_GROUP_TO_CSS_CLASS
};
