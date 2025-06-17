// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Configuración de Firebase con las credenciales de las variables de entorno
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para guardar un experimento en Firestore
export async function guardarExperimento(empresa, datosExperimento) {
  try {
    const docRef = await addDoc(collection(db, "experimentos"), {
      empresa: empresa,  // Guarda el nombre de la empresa
      datos: datosExperimento,  // Guarda los datos del experimento
      fecha_creacion: new Date()  // Registra la fecha de creación del experimento
    });
    console.log("Documento guardado con ID: ", docRef.id);
  } catch (e) {
    console.error("Error al agregar documento: ", e);
  }
}

// Función para obtener los experimentos de una empresa específica
export async function obtenerExperimentos(empresa) {
  const querySnapshot = await getDocs(collection(db, "experimentos"));
  const experimentos = [];
  
  querySnapshot.forEach((doc) => {
    if (doc.data().empresa === empresa) {
      experimentos.push(doc.data());  // Almacena los experimentos que coincidan con la empresa
    }
  });
  
  return experimentos;  // Retorna los experimentos de la empresa
}
