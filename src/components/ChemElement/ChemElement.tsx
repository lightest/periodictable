import "./ChemElement.css";
import { ChemicalElement, iChemElement } from "../../types/iChemElement";
import { ELEMENT_GROUP_TO_CSS_CLASS } from "../Dataset";

const ROTATION_ANGLE = 15;

interface componentProps
{
	chemEl: iChemElement,
	idx: number,
	className: string,
	onClick: Function
};

export default function ChemElement({ chemEl, idx, className, onClick }: componentProps)
{
	const el = new ChemicalElement(chemEl);

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

	console.log("Chem el render", chemEl, el.periodNumber);

	const style =
	{
		gridRowStart: el.periodNumber,
		gridColumnStart: el.groupNumber,
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
