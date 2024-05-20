import "./ChemElement.css";


export default function ChemElement({ chemEl })
{

	// Electron configuration is the distribution of electrons in atomic or molecular orbitals.
	const electronConfig = chemEl.electronConfiguration;
	const bracketIndex = electronConfig.indexOf("]");

	let row = "";

	if (bracketIndex > -1)
	{
		row = electronConfig.substring(bracketIndex + 1).trim()[0];
	}
	else
	{
		row = electronConfig[0];
	}

	console.log("Chem el render", chemEl, row);

	const style = {
		gridRowStart: row,
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
