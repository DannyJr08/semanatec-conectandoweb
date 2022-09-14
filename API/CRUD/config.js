const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyBXMJoTNoHT9hJwL1qGNEzLeb_uCb9Krw8",
    authDomain: "semana-tec-web-6.firebaseapp.com",
    databaseURL: "https://semana-tec-web-6-default-rtdb.firebaseio.com",
    projectId: "semana-tec-web-6",
    storageBucket: "semana-tec-web-6.appspot.com",
    messagingSenderId: "761986698524",
    appId: "1:761986698524:web:6283eb7068bac4e40ebed9",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const Usuario = db.collection("Usuario");
const Lista = db.collection("Lista");
module.exports = Usuario;
module.exports = Lista;
console.log("Conectado a la base de datos.")