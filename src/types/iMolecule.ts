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
	bondType: BondType
}

export class Atom
{
	element: ChemicalElement;
	bonds: Array<iBond>;

	constructor(cfg: iAtomProps)
	{
		this.element = cfg.element;
		this.bonds = [];
	}

	canBondWith(incomingAtom: Atom)
	{
		const valenceEletrons = this.element.valenceElectrons + incomingAtom.element.valenceElectrons;

		// Octet rule. Atoms will continue to form bonds until an octet of electrons is made on the outmost shell.
		return valenceEletrons >= 2 && valenceEletrons <= 8;
	}

	establishBond(incomingAtom: Atom)
	{
		const electronegativityDelta = Math.abs(this.element.electronegativity - incomingAtom.element.electronegativity);

		// TODO: describe here how bond is made, accounting for electron exchange.

		let bondType:BondType = "ionic";

		const bond: iBond = {
			atom: incomingAtom,
			bondType
		};

		this.bonds.push(bond);
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

		const electronegativityDelta = element.

	}
}
