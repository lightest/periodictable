export interface iChemElement
{
	atomicNumber: number,
	atomicMass: number,
	electronConfiguration: string,
	symbol: string,
	group: string,
	name: string,
	hexColor: string
}

export class ChemicalElement
{
	atomicNumber: number;
	atomicMass: number;
	electronConfiguration: string;
	symbol: string;
	group: string;
	name: string;
	hexColor: string;

	constructor(data: iChemElement)
	{
		this.atomicNumber = data.atomicNumber;
		this.atomicMass = data.atomicMass;
		this.electronConfiguration = data.electronConfiguration;
		this.symbol = data.symbol;
		this.group = data.group;
		this.name = data.name;
		this.hexColor = data.hexColor;
	}
}
