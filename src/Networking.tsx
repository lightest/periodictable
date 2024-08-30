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
  const response = await fetch("http://localhost:3000/api/chat",
  {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
    {
      messages: [{ role: "user", content: prompt }],
      stream: false,
      ...options,
    }),
  });

  if (!response.ok)
  {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export async function bondElements(el1: iChemElement, el2: iChemElement)
{
  const resp = await fetch(`${HOST}/api/bondElements`, {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
    {
      el1, el2
    })
  })

  if (!resp.ok)
  {
    throw new Error(`HTTP error! status: ${resp.status}`);
  }

  return resp.json();
}
