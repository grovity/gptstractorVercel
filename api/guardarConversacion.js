import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { pregunta, respuesta } = req.body;
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxVRp05Jn4GDTuUk8nVM5-PkL4lX1IdCteDSwNlW3hK2EAmc01His2Gb9dwJwE5C7Yd/exec';

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta, respuesta })
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', error: error.toString() });
    }

  } else {
    res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }
}
