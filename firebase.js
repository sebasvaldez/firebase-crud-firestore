// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

//importando lo necesario para crear y guardar datos en mi db de firestore

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfU7YLo83r9uk2Hs7jTVMPiVej6J1HdWA",
  authDomain: "fir-js-crud-a71da.firebaseapp.com",
  projectId: "fir-js-crud-a71da",
  storageBucket: "fir-js-crud-a71da.appspot.com",
  messagingSenderId: "82354006083",
  appId: "1:82354006083:web:ccf8ce199c924ecfa00cf6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const savetask = (title, description) => {
  //guardar un documento (addDoc) dentro de una coleccion de tareas (collecion), llamada tasks

  addDoc(collection(db, "tasks"), { title, description });
};

//export const getTasks = () => getDocs(collection(db, "tasks"));

//esta funcion trae todos los documentos de la coleccion tasks
export const onGetTasks = (callback) => {
  onSnapshot(collection(db, "tasks"), callback);
};

//funcion para borrar documentos
export const deleteTask = (id) => {
  deleteDoc(doc(db, "tasks", id));
};

//funcion para traer 1 documento de la coleccion
export const getTask = (id) => {
  const docSnap = getDoc(doc(db, "tasks", id));
  return docSnap;
};

//funcion para actualizar la informacion de un documento
//newFields es el objeto con la informacion actualizada

export const updateTask = (id, newFields) => {
  updateDoc(doc(db, "tasks", id), newFields);
};
