//Librerias a usar
const express = require("express");
const cors = require("cors");
const firebase = require("firebase/app");
const Ent = require("./config.js");
const app = express();

app.use(express.json());
app.use(cors());

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
    await Ent.Usuario.add(data);
    res.send({ msg: "Usuario registrado correctamente" })
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
app.post("/delete", async (req, res) => {
    const id = req.body.id;
    await  Ent.Usuario.doc(id).delete();
    res.send({ msg: "Usuario Eliminado" });
});

app.listen(8080, () => console.log("Server iniciado en el puerto 8080"))