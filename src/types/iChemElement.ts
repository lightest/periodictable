export interface iChemElement
{
	atomicNumber: number,
	atomicMass: number,
	electronConfiguration: string,
	electronegativity: number,
	symbol: string,
	group: string,
	name: string,
	hexColor: string
}

interface iElectronShell
{
	n: number,
	electrons: number
}

export class ChemicalElement
{
	atomicNumber: number;
	atomicMass: number;
	electronConfiguration: string;
	electronegativity: number;
	symbol: string;
	chemicalGroup: string;
	name: string;
	hexColor: string;
	valenceElectrons: number;
	periodNumber: number;
	groupNumber: number;

	constructor(data: iChemElement)
	{
		this.atomicNumber = data.atomicNumber;
		this.atomicMass = data.atomicMass;
		this.electronConfiguration = data.electronConfiguration;
		this.electronegativity = data.electronegativity;
		this.symbol = data.symbol;
		this.chemicalGroup = data.group;
		this.name = data.name;
		this.hexColor = data.hexColor;

		this.valenceElectrons = 0;
		this.periodNumber = 0;
		this.groupNumber = 0;

		this.parseElectronConfiguration();
	}

	parseElectronConfiguration()
	{
		this.valenceElectrons = 0;
		this.periodNumber = 0;

		// Electron configuration is the distribution of electrons in atomic or molecular orbitals.
		const electronConfig = this.electronConfiguration;
		const bracketIndex = electronConfig.indexOf("]");
		const outermostElectronShellStr = electronConfig.substring(bracketIndex + 1).trim();

		// TODO: potentially employ regexes for identifying subshells as well.
		const subshells = outermostElectronShellStr.split(" ");
		const outerElectronShell:Record<string, iElectronShell> = {};

		// Even though our dataset presents already sorted subshells, we go extra mile to ensure we always pick the highest.
		// This will improve our chances of getting the correct value, should the notation in the incoming dataset change.
		for (let i = 0; i < subshells.length; i++)
		{
			const match = subshells[i].match(/(\d+)([spdf]+)(\d+)/);
			if (match)
			{
				// s, p, d, f orbital types.
				const orbitalType = match[2];

				outerElectronShell[orbitalType] =
				{
					n: parseInt(match[1], 10),
					electrons: parseInt(match[3], 10)
				};

				// Period of the element is the max quantum number amon outer most shells.
				this.periodNumber = Math.max(this.periodNumber, outerElectronShell[orbitalType].n);

				if (orbitalType === "s" || orbitalType === "p" || orbitalType === "d")
				{
					this.valenceElectrons += outerElectronShell[orbitalType].electrons;
				}
			}
		}

		// Lanthanides and Actinides are a special case. They are placed two rows below the table.
		// Their actual periods are 6 and 7 respectively.
		if (this.chemicalGroup === "Lanthanide" || this.chemicalGroup === "Actinide")
		{
			this.periodNumber += 2;

			if (outerElectronShell["f"] !== undefined)
			{
				this.valenceElectrons += outerElectronShell["f"].electrons;
			}
		}

		// TODO: identify noble gas by it's electron configuration.
		if (this.chemicalGroup === "Noble gas")
		{
			this.groupNumber = 18;
		}
		else if (outerElectronShell["p"] !== undefined && outerElectronShell["d"] === undefined)
		{
			this.groupNumber = this.valenceElectrons + 10;
		}
		else
		{
			this.groupNumber = this.valenceElectrons;
		}
	}

	getBondType()
	{

	}
}
