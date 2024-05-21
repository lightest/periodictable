import dataset from "../../data/PubChemElements_all.json";

const planets = [
	{
		id: 0, planet: "voxtron", type: "vulcanic",
		radius: 1,
		surfaceArea: 2,
		mass: 3,
	},

	{
		id: 1, planet: "tatooin", type: "desert",
		radius: 2,
		surfaceArea: 2,
		mass: 3,
	},

	{
		id: 2, planet: "hoth", type: "ice",
		radius: 3,
		surfaceArea: 2,
		mass: 3,
	},

	{
		id: 3, planet: "kashyk", type: "forest",
		radius: 4,
		surfaceArea: 2,
		mass: 3,
	},

	{
		id: 4, planet: "manaan", type: "ocean",
		radius: 5,
		surfaceArea: 2,
		mass: 3,
	},

	{
		id: 5, planet: "endor", type: "jungle",
		radius: 6,
		surfaceArea: 2,
		mass: 3,
	}
];

// const chemicalElements = [
// 	{
// 		name: "hydrogen",
// 		atomicNumber: 1,
// 		atomicMass: 1.0080,
// 		symbol: "H",
// 		group: "halogen"
// 	},
// 	{
// 		name: "Copper",
// 		atomicNumber: 29,
// 		atomicMass: 63.55,
// 		symbol: "Cu",
// 		group: "transition metal"
// 	},
// ];

const COLUMN_NAMES_REMAP = {
	"AtomicNumber": "atomicNumber",
	"Symbol": "symbol",
	"Name": "name",
	"AtomicMass": "atomicMass",
	"CPKHexColor": "",
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

function processDataset(dataset, fields = [])
{
	const t = performance.now();
	const cols = dataset.Table.Columns.Column;
	const elementsData = dataset.Table.Row;
	const chemicalElementsList = new Array(elementsData.length);
	const chemicalElementsLUT = {};
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
	}

	console.log("Data processing took:", performance.now() - t);

	return {
		chemicalElementsList,
		chemicalElementsLUT
	};
}

const {
	chemicalElementsList,
	chemicalElementsLUT
} = processDataset(
	dataset,
	[
		"AtomicNumber",
		"AtomicMass",
		"ElectronConfiguration",
		"Symbol",
		"GroupBlock",
		"Name"
	]
);

console.log(chemicalElementsLUT);

export {
	planets,
	chemicalElementsList,
	chemicalElementsLUT
};
