//Librerias a usar
const express = require("express");
const cors = require("cors");
const firebase = require("firebase/app");
const {Timestamp} = require('firebase-admin/firestore');
const Ent = require("./config.js");
const app = express();
app.use(express.json());
app.use(cors());

//Funcion Hash de dominio publico 
const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};

//GET (Read)
app.get("/user", async (req, res) => {
    const snapshotU = await Ent.Usuario.get();
    const listU = snapshotU.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(listU);
});
app.get("/list", async (req, res) => {
    const snapshot = await Ent.Lista.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
});
app.get("/reminder", async (req, res) => {
    const snapshotR = await Ent.Recordatorio.get();
    const listR = snapshotR.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(listR);
});


//POST (Create)
app.post("/createUser", async (req, res) => {
    const data = req.body;
    const snapshot = await Ent.Usuario.where("email", "==", data.email).get();
    const does_exist = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (does_exist.length == 0 ){
        await Ent.Usuario.add({
            email: data.email,
            hash: cyrb53(data.hash, 5),
            signature: data.signature
        });
        res.send({ msg: "Usuario registrado correctamente" })
    }
    else{
        res.send({ msg: "Usuario ya existente"})
    }
    
});
app.post("/createList", async (req, res) => {
    const dataL = req.body;
    await Ent.Lista.add(dataL);
    res.send({ msg: "Lista registrada correctamente" })
});
app.post("/createReminder", async (req, res) => {
    const dataR = req.body;
    await Ent.Recordatorio.add({
        id_list: dataR.id_list,
        content : dataR.content,
        date : firebase.firestore.FieldValue.serverTimestamp()
    });
    res.send({ msg: "Recordatorio registrado correctamente" })
});

//Update
app.post("/update", async (req, res) => {
    const id = req.body.id;
    delete req.body.id;
    const data = req.body;
    await  Ent.Usuario.doc(id).update(data);
    res.send({ msg: "Usuario actualizado" });
});

// Delete
app.delete("/deleteUser", async (req, res) => {
    const email = req.body.email;
    var mns = "Usuario No Existente";
    const snapshot = await Ent.Usuario.get();
    snapshot.forEach(doc => {
        var data = doc.data();
        if (data.email == email) {
            Ent.Usuario.doc(`${doc.id}`).delete();
            mns = "Usuario Eliminado"
        }
    });
    res.send({ msg: mns });
});
app.delete("/deleteReminder", async (req, res) => {
    const idList = req.body.id_list;
    const content = req.body.content;
    const date = req.body.date;

    // dateComplete = dateComplete.split("$");
    // const date = dateComplete[0].split("-");
    // const hour = dateComplete[1];

    const dateFirebase = Timestamp.fromDate(new Date(date));
    // console.log(dateFirebase);

    var mns = "Recordatorio No Existente";

    const snapshot = await Ent.Recordatorio.get();
    snapshot.forEach(doc => {
        var data = doc.data();
        if (data.id_list == idList && data.content == content && data.date.seconds == dateFirebase.seconds) {
            Ent.Recordatorio.doc(`${doc.id}`).delete();
            mns = "Recordatorio Eliminado"
        }
    });
    
    res.send({ msg: mns });
});
app.delete("/deleteList", async (req, res) => {
    const idList = req.body.id;
    const idUser = req.body.id_user;
    const name = req.body.name;

    var mns = "Lista No Existente";

    const snapshotRec = await Ent.Recordatorio.get();
    const snapshot = await Ent.Lista.get();
    snapshot.forEach(doc => {
        var data = doc.data();
        if (doc.id == idList && data.id_user == idUser && data.name == name) {
            snapshotRec.forEach(docR => {
                var dataR = docR.data();
                if (dataR.id_list == idList) {
                    Ent.Recordatorio.doc(`${docR.id}`).delete();
                }
            });
            Ent.Lista.doc(`${doc.id}`).delete();
            mns = "Lista & Recordatorios Eliminados"
        }
    });
    
    res.send({ msg: mns });
});

app.listen(8080, () => console.log("Server iniciado en el puerto 8080"))