import { ChemicalElement, iChemElement } from "./iChemElement";

export interface iMolecule
{

}

interface iAtomProps
{
	element: ChemicalElement
}

type BondType = "ionic" | "covalent" | "metallic";

interface iBond
{
	atom: Atom,
	bondType: BondType,
	sharedElectrons: number
}

const MAIN_GROUP_ELEMENTS: Array<boolean> = [];
MAIN_GROUP_ELEMENTS[1] = true;
MAIN_GROUP_ELEMENTS[2] = true;
MAIN_GROUP_ELEMENTS[13] = true;
MAIN_GROUP_ELEMENTS[14] = true;
MAIN_GROUP_ELEMENTS[15] = true;
MAIN_GROUP_ELEMENTS[16] = true;
MAIN_GROUP_ELEMENTS[17] = true;
MAIN_GROUP_ELEMENTS[18] = true;

export class Atom
{
	element: ChemicalElement;
	bonds: Array<iBond>;

	constructor(cfg: iAtomProps)
	{
		this.element = cfg.element;
		this.bonds = [];
	}

	canBondWith(incomingAtom: Atom):boolean
	{
		// TODO: handle exceptions for He, H, Li.

		const totalValenceEletrons = this.element.valenceElectrons + incomingAtom.element.valenceElectrons;

		if (MAIN_GROUP_ELEMENTS[this.element.groupNumber] && MAIN_GROUP_ELEMENTS[incomingAtom.element.groupNumber])
		{
			// Octet rule. Atoms will continue to form bonds until an octet of electrons is made on the outmost shell.
			return totalValenceEletrons <= 8;
		}
		else if (this.element.groupNumber >= 3 && this.element.groupNumber <= 12)
		{
			// Transition elements can hold 18 electrons.
			return totalValenceEletrons <= 18;
		}

		return false;
	}

	establishBond(incomingAtom: Atom)
	{
		let bondType: BondType;
		let sharedElectrons = 0;
		const electronegativityDelta = Math.abs(this.element.electronegativity - incomingAtom.element.electronegativity);
		const totalValenceElectrons = this.element.valenceElectrons + incomingAtom.element.valenceElectrons;

		if (totalValenceElectrons === 8 && electronegativityDelta > 0)
		{
			// Ionic bond is possible. Transfer electrons from one atom to the other.
			let acceptorAtom;
			let donorAtom;

			if (this.element.electronegativity > incomingAtom.element.electronegativity)
			{
				acceptorAtom = this;
				donorAtom = incomingAtom;
			}
			else
			{
				acceptorAtom = incomingAtom;
				donorAtom = this;
			}

			acceptorAtom.element.valenceElectrons += donorAtom.element.valenceElectrons;
			donorAtom.element.valenceElectrons = 0;

			bondType = "ionic";
		}
		else if (totalValenceElectrons)
		{
			bondType = "covalent";

		}
		else
		{
			bondType = "metallic";
		}

		if (bondType !== undefined)
		{
			this.bonds.push({
				atom: incomingAtom,
				bondType,
				sharedElectrons
			});

			incomingAtom.bonds.push({
				atom: this,
				bondType,
				sharedElectrons
			});
		}
	}
}

export class Molecule
{
	elements: Array<ChemicalElement>;
	formula: string;
	electronegativityDelta: number;

	constructor()
	{
		this.elements = [];
		this.formula = "";
		this.electronegativityDelta = 0;
	}

	canBondWith(element: ChemicalElement)
	{
		let valenceEletrons = element.valenceElectrons;

		for (let i = 0; i < this.elements.length; i++)
		{
			valenceEletrons += this.elements[i].valenceElectrons;
		}

		// Octet rule. Atoms will continue to form bonds until an octet of electrons is made.
		return valenceEletrons >= 2 && valenceEletrons <= 8;
	}

	bondWithElement(element: ChemicalElement)
	{
		if (!this.canBondWith(element))
		{
			return;
		}



	}
}
