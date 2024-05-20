import "./PeriodicTable.css";
import ChemElement from "../ChemElement/ChemElement.tsx";

export default function PeriodicTable({chemElements})
{
	return(
		<div className="periodic-table">
			{chemElements.map(ce =>
				<ChemElement
					key={ce.atomicNumber}
					chemEl={ce}>
				</ChemElement>
			)}
		</div>
	);
}
