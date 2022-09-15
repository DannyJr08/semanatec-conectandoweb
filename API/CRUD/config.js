// Libreria a llamar
const firebase = require("firebase");
//Credenciales
const firebaseConfig = {
    apiKey: "AIzaSyBXMJoTNoHT9hJwL1qGNEzLeb_uCb9Krw8",
    authDomain: "semana-tec-web-6.firebaseapp.com",
    databaseURL: "https://semana-tec-web-6-default-rtdb.firebaseio.com",
    projectId: "semana-tec-web-6",
    storageBucket: "semana-tec-web-6.appspot.com",
    messagingSenderId: "761986698524",
    appId: "1:761986698524:web:6283eb7068bac4e40ebed9",
};
//Inicializa Firebase
firebase.initializeApp(firebaseConfig);
//Define la base de datos
const db = firebase.firestore();
console.log("Conectado a la base de datos.")
//Define nuestras "Colecciones(Entidades)"
const Usuario = db.collection("Usuario");
const Lista = db.collection("Lista");
const Recordatorio = db.collection("Recordatorio");
//Exportamos nuestras identidades para que otros archivos
//Puedan interactuar con estas
module.exports.Usuario = Usuario;
module.exports.Lista = Lista;
module.exports.Recordatorio = Recordatorio;
console.log("Colecciones locales cargadas.")
