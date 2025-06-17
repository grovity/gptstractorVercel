 import { obtenerExperimentos } from './firebaseConfig';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { empresa } = req.query;

    // Obtener los experimentos de la empresa desde Firebase
    const experimentos = await obtenerExperimentos(empresa);

    return res.status(200).json(experimentos);
  } else {
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }
}
