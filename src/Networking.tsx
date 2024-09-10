import { iChemElement } from "./types/iChemElement";

const HOST = "http://localhost:3000";

/**
* Fetches a chat response from the Ollama API.
* @param {string} prompt - The user's input prompt.
* @param {object} options - Additional options for the API call.
* @returns {Promise<Response>} A promise that resolves with the API response.
*/
export const fetchOllamaChat = async (prompt: string, options: object = {}) =>
{
    const response = await fetch(
        "http://localhost:3000/api/chat",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: prompt }],
                stream: false,
                ...options,
            }),
        }
    );

    if (!response.ok)
    {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function bondElements(elements: iChemElement[])
{
    const resp = await fetch(
        `${HOST}/api/bondElements`,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                elements
            })
        }
    );

    if (!resp.ok)
    {
        throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp.json();
}

export async function describeElement(element: iChemElement)
{
    const resp = await fetch(
        `${HOST}/api/describeElement`,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                element
            })
        }
    );

    if (!resp.ok)
    {
        throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp.json();
}

export async function solveChemicalBalanceEquation(equation: string)
{
    const resp = await fetch(
        `${HOST}/api/solveChemicalBalanceEquation`,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                equation
            })
        }
    );

    if (!resp.ok)
    {
        throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return resp.json();
}
