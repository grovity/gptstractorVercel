import fetch from 'node-fetch';

let conversaciones = [];  // Array that accumulates all the questions/responses

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { pregunta, respuesta } = req.body;
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxVRp05Jn4GDTuUk8nVM5-PkL4lX1IdCteDSwNlW3hK2EAmc01His2Gb9dwJwE5C7Yd/exec';

    // Accumulate the question and answer
    conversaciones.push({ pregunta, respuesta });

    // Send all interactions after X interactions
    if (conversaciones.length >= 5) {  // Or the number of interactions you prefer
      try {
        const response = await fetch(SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversaciones })  // Send all interactions
        });

        const data = await response.json();
        conversaciones = [];  // Clear the array after sending it

        return res.status(200).json({ status: 'ok', data });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', error: error.toString() });
      }
    } else {
      return res.status(200).json({ status: 'ok' });
    }
  } else {
    res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }
}
