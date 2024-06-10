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
	symbol: string;
	chemicalGroup: string;
	name: string;
	hexColor: string;
	valentElectrons: number;
	periodNumber: number;
	groupNumber: number;

	constructor(data: iChemElement)
	{
		this.atomicNumber = data.atomicNumber;
		this.atomicMass = data.atomicMass;
		this.electronConfiguration = data.electronConfiguration;
		this.symbol = data.symbol;
		this.chemicalGroup = data.group;
		this.name = data.name;
		this.hexColor = data.hexColor;

		this.valentElectrons = 0;
		this.periodNumber = 0;
		this.groupNumber = 0;

		this.parseElectronConfiguration();
	}

	parseElectronConfiguration()
	{
		const electronConfig = this.electronConfiguration;

		// Electron configuration is the distribution of electrons in atomic or molecular orbitals.
		const bracketIndex = electronConfig.indexOf("]");
		const outermostElectronShellStr = electronConfig.substring(bracketIndex + 1).trim();

		// TODO: potentially employ regexes for identifying subshells as well.
		const subshells = outermostElectronShellStr.split(" ");
		const outerElectronShell:Record<string, iElectronShell> = {};
		this.valentElectrons = 0;
		this.periodNumber = 0;

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
					this.valentElectrons += outerElectronShell[orbitalType].electrons;
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
				this.valentElectrons += outerElectronShell["f"].electrons;
			}
		}

		// TODO: identify noble gas by it's electron configuration.
		if (this.chemicalGroup === "Noble gas")
		{
			this.groupNumber = 18;
		}
		else if (outerElectronShell["p"] !== undefined && outerElectronShell["d"] === undefined)
		{
			this.groupNumber = this.valentElectrons + 10;
		}
		else
		{
			this.groupNumber = this.valentElectrons;
		}
	}
}
