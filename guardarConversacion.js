 // guardarConversacion.js
import { guardarExperimento } from './firebaseConfig';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { pregunta, respuesta, empresa } = req.body;

    // Guarda el experimento en Firebase
    await guardarExperimento(empresa, {
      pregunta,
      respuesta
    });

    return res.status(200).json({ status: 'ok' });
  } else {
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }
}
