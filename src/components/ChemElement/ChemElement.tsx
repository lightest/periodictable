import "./ChemElement.css";


function getElemenPositioning(chemEl)
{
	const electronConfig = chemEl.electronConfiguration;
	// Electron configuration is the distribution of electrons in atomic or molecular orbitals.
	const bracketIndex = electronConfig.indexOf("]");
	const outermostElectronShell = electronConfig.substring(bracketIndex + 1).trim();

	// TODO: potentially employ regexes for identifying subshells as well.
	const subshells = outermostElectronShell.split(" ");
	const groupBlocks = {};
	let valentElectrons = 0;
	let period = 0;
	let group = 0;

	// Even though our dataset presents already sorted subshells, we go extra mile to ensure we always pick the highest.
	// This will improve our chances of getting the correct value, should the notation in the incoming dataset change.
	for (let i = 0; i < subshells.length; i++)
	{
		const match = subshells[i].match(/(\d+)([spdf]+)(\d+)/);
		if (match)
		{
			// s, p, d, f orbital types.
			const orbitalType = match[2];

			groupBlocks[orbitalType] =
			{
				n: parseInt(match[1], 10),
				electrons: parseInt(match[3], 10)
			};

			// Period of the element is the max quantum number amon outer most shells.
			period = Math.max(period, groupBlocks[orbitalType].n);

			if (orbitalType === "s" || orbitalType === "p" || orbitalType === "d")
			{
				valentElectrons += groupBlocks[orbitalType].electrons;
			}
		}
	}

	if (groupBlocks["p"] !== undefined && groupBlocks["d"] === undefined)
	{
		group = valentElectrons + 10;
	}
	else
	{
		group = valentElectrons;
	}

	console.log("location for", electronConfig, period, group)

	return {
		row: period,
		col: group
	}
}

export default function ChemElement({ chemEl })
{
	const { row, col } = getElemenPositioning(chemEl);

	console.log("Chem el render", chemEl, row);

	const style = {
		gridRowStart: row,
		gridColumnStart: col
	};

	return(
		<div className="chem-element" style={style}>
			<div className="data-row">
				<div className="element-atomic-number">{chemEl.atomicNumber}</div>
				<div className="element-atomic-mass">{chemEl.atomicMass}</div>
			</div>
			<div className="element-symbol">{chemEl.symbol}</div>
			<div className="element-name">{chemEl.name}</div>
			<div className="element-chemical-group">{chemEl.group}</div>
		</div>
	);
}
