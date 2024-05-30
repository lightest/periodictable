import "./ChemElementLarge.css";

import { iChemElement } from "../../types/iChemElement";
import { ELEMENT_GROUP_TO_CSS_CLASS } from "../Dataset";

interface iComponentnProps
{
	chemEl: iChemElement
};

export default function ChemElementLarge({ chemEl }: iComponentnProps)
{
	return(
		<div className={`chem-element-large ${ELEMENT_GROUP_TO_CSS_CLASS[chemEl.group]}`}>
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
