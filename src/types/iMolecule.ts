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

	bondAtoms(atom1: Atom, atom2: Atom)
	{
		let bondType: BondType;
		const electronegativityDelta = Math.abs(atom2.element.electronegativity - atom1.element.electronegativity);
		const totalValenceElectrons = atom2.element.valenceElectrons + atom1.element.valenceElectrons;

		// TODO: this is not complete conditions description for ionic bonds. See SiC molecule.
		if (totalValenceElectrons === 8 && electronegativityDelta > 0)
		{
			// Ionic bond is possible. Transfer electrons from one atom to the other.
			let acceptorAtom;
			let donorAtom;

			if (atom2.element.electronegativity > atom1.element.electronegativity)
			{
				acceptorAtom = atom2;
				donorAtom = atom1;
			}
			else
			{
				acceptorAtom = atom1;
				donorAtom = atom2;
			}

			acceptorAtom.element.valenceElectrons += donorAtom.element.valenceElectrons;
			donorAtom.element.valenceElectrons = 0;

			acceptorAtom.bonds.push({
				atom: donorAtom,
				bondType: "ionic",
				sharedElectrons: 0
			});

			donorAtom.bonds.push({
				atom: acceptorAtom,
				bondType: "ionic",
				sharedElectrons: 0
			});
		}
		else if (totalValenceElectrons >= 8)
		{
			const atom1Requirements = 8 - atom1.element.valenceElectrons;
			const atom2Requirements = 8 - atom2.element.valenceElectrons;
			const min = Math.min(atom1Requirements, atom2Requirements);

			// TODO: check this.

			atom1.element.valenceElectrons -= min;
			atom2.element.valenceElectrons -= min;

			atom2.bonds.push({
				atom: atom1,
				bondType: "covalent",
				sharedElectrons: min
			});

			atom1.bonds.push({
				atom: atom2,
				bondType: "covalent",
				sharedElectrons: min
			});

		}
		else
		{
			bondType = "metallic";
		}

		if (bondType !== undefined)
		{
		}
	}
}
