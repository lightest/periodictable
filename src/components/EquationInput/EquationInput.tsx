import { useState } from "react"
import * as Networking from "../../Networking"
import "./EquationInput.css";

export function EquationInput()
{
    const [equationVal, setEquationVal] = useState("");
    const [llmResponse, setLLMResponse] = useState("");

    function handleChange(e)
    {
        setEquationVal(e.currentTarget.value);
    }

    async function handleKeydown(e)
    {
        if (e.key === "Enter")
        {
            const resp = await Networking.solveChemicalBalanceEquation(equationVal);
            setLLMResponse(resp.response);
        }
    }

    async function handleSolveClick()
    {
        const resp = await Networking.solveChemicalBalanceEquation(equationVal);
        setLLMResponse(resp.response);
    }

    return <>
        <input type="text" onChange={handleChange} onKeyDown={handleKeydown} value={equationVal}></input>
        <div className="btn" onClick={handleSolveClick}>solve</div>
        <div>{llmResponse}</div>
    </>
}
