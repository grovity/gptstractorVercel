import fetch from 'node-fetch';

let conversaciones = [];  // Array que acumula todas las preguntas/respuestas

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { pregunta, respuesta } = req.body;
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxVRp05Jn4GDTuUk8nVM5-PkL4lX1IdCteDSwNlW3hK2EAmc01His2Gb9dwJwE5C7Yd/exec';

    // Log para verificar que estamos acumulando bien las interacciones
    console.log('Acumulando:', { pregunta, respuesta });

    // Acumulamos la pregunta y la respuesta
    conversaciones.push({ pregunta, respuesta });

    // Verificamos si se llegó al límite de interacciones (por ejemplo, 5)
    console.log('Interacciones acumuladas:', conversaciones.length);

    // Enviar todas las interacciones juntas después de X interacciones
    if (conversaciones.length >= 5) {
      try {
        console.log('Enviando todas las interacciones a Apps Script:', conversaciones);

        const response = await fetch(SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversaciones })  // Enviar todas las interacciones
        });

        const data = await response.json();
        conversaciones = [];  // Limpiamos el array después de enviarlo

        console.log('Respuesta de Apps Script:', data);

        return res.status(200).json({ status: 'ok', data });
      } catch (error) {
        console.error('Error al enviar datos a Apps Script:', error);
        return res.status(500).json({ status: 'error', error: error.toString() });
      }
    } else {
      console.log('Esperando más interacciones...');
      return res.status(200).json({ status: 'ok' });
    }
  } else {
    res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }
}
