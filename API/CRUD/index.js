const express = require("express");
const cors = require("cors");
const Usuario = require("./config.js");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/createUser", async (req, res) => {
    const data = req.body
    await Usuario.add(data)
    res.send({msg: "Usuario registrado correctamente"})
});

app.listen(8080, () => console.log("Server iniciado en el puerto 8080"))