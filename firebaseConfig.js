// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Configuración de Firebase con las credenciales de las variables de entorno
const firebaseConfig = {
  apiKey: "AIzaSyBcJLm9WcRKdUPAkXx11YeyK2KnfnqCPgI",
  authDomain: "microexperimentsdb.firebaseapp.com",
  projectId: "microexperimentsdb",
  storageBucket: "microexperimentsdb.firebasestorage.app",
  messagingSenderId: "550223739499",
  appId: "1:550223739499:web:6d8f53433e669f0afe8f2e"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para guardar un experimento en Firestore
export async function guardarExperimento(empresa, pregunta, respuesta) {
  try {
    const docRef = await addDoc(collection(db, "experimentos"), {
      empresa: empresa,  // Guarda el nombre de la empresa
      pregunta: pregunta,  // Guarda la pregunta
      respuesta: respuesta,  // Guarda la respuesta
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
