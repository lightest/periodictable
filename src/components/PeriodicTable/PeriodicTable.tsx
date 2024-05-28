import "./PeriodicTable.css";
import ChemElement from "../ChemElement/ChemElement.tsx";

export default function PeriodicTable({chemElements, onChemElementClick})
{
	const chemicalElementsList = chemElements.map(ce =>
		<ChemElement
			key={ce.atomicNumber}
			chemEl={ce}
			onClick={onChemElementClick}>
		</ChemElement>
	);

	return(
		<div className="periodic-table">{chemicalElementsList}</div>
	);
}
