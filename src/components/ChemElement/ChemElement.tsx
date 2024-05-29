import "./ChemElement.css";
import { iChemElement } from "../../types/ChemElement";

const ROTATION_ANGLE = 19;

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

function getElemenPositioning(chemEl: iChemElement)
{
	const electronConfig = chemEl.electronConfiguration;

	// Electron configuration is the distribution of electrons in atomic or molecular orbitals.
	const bracketIndex = electronConfig.indexOf("]");
	const outermostElectronShellStr = electronConfig.substring(bracketIndex + 1).trim();

	// TODO: potentially employ regexes for identifying subshells as well.
	const subshells = outermostElectronShellStr.split(" ");
	const outerElectronShell = {};
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

			outerElectronShell[orbitalType] =
			{
				n: parseInt(match[1], 10),
				electrons: parseInt(match[3], 10)
			};

			// Period of the element is the max quantum number amon outer most shells.
			period = Math.max(period, outerElectronShell[orbitalType].n);

			if (orbitalType === "s" || orbitalType === "p" || orbitalType === "d")
			{
				valentElectrons += outerElectronShell[orbitalType].electrons;
			}
		}
	}

	// Lanthanides and Actinides are a special case. They are placed two rows below the table.
	// Their actual periods are 6 and 7 respectively.
	if (chemEl.group === "Lanthanide" || chemEl.group === "Actinide")
	{
		period += 2;

		if (outerElectronShell["f"] !== undefined)
		{
			valentElectrons += outerElectronShell["f"].electrons;
		}
	}

	// TODO: identify noble gas by it's electron configuration.
	if (chemEl.group === "Noble gas")
	{
		group = 18;
	}
	else if (outerElectronShell["p"] !== undefined && outerElectronShell["d"] === undefined)
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

interface componentProps {
	chemEl: iChemElement,
	idx: number,
	className: string,
	onClick: Function
};

export default function ChemElement({ chemEl, idx, className, onClick }: componentProps)
{
	const { row, col } = getElemenPositioning(chemEl);

	function handleMouseMove(e)
	{
		const elBCR = e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - elBCR.x) / elBCR.width) * 2 - 1;
		const y = ((e.clientY - elBCR.y) / elBCR.height) * 2 - 1;
		e.currentTarget.classList.add("inspecting");
		e.currentTarget.style.transform = `perspective(800px) rotateX(${-y * ROTATION_ANGLE}deg) rotateY(${x * ROTATION_ANGLE}deg)`;
	}

	function handleMouseOut(e)
	{
		e.currentTarget.classList.remove("inspecting");
		e.currentTarget.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
	}

	function handleClick()
	{
		if (typeof onClick === "function")
		{
			onClick(chemEl);
		}
	}

	console.log("Chem el render", chemEl, row);

	const style = {
		gridRowStart: row,
		gridColumnStart: col,
		// background: `#${chemEl.hexColor}`
	};

	return(
		<div className={`chem-element ${ELEMENT_GROUP_TO_CSS_CLASS[chemEl.group]} ${className}`} style={style}
			data-idx={idx}
			onMouseMove={handleMouseMove}
			onMouseOut={handleMouseOut}
			onClick={handleClick}>
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
