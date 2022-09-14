//Librerias a usar
const express = require("express");
const cors = require("cors");
const Ent = require("./config.js");
const app = express();

app.use(express.json());
app.use(cors());
//GET (Read)
app.get("/", async (req, res) => {
    const snapshot = await Ent.Lista.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
});
//POST (Create)
app.post("/createUser", async (req, res) => {
    const data = req.body;
    await Ent.Usuario.add(data);
    res.send({ msg: "Usuario registrado correctamente" })
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