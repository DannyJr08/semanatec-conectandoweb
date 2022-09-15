//Librerias a usar
const express = require("express");
const cors = require("cors");
const firebase = require("firebase/app");
const Ent = require("./config.js");
const app = express();
app.use(express.json());
app.use(cors());

//Funcion Hash de dominio publico 
const cyrb53 = function (str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

//GET (Read)
app.get("/user", async (req, res) => {
    try {
        const snapshotU = await Ent.Usuario.get();
        const listU = snapshotU.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.send(listU);
        console.log("GET de todos los usuarios con exito");
    } catch (error) {
        console.log("Error en GET todos los usuarios");
    }
});
app.get("/userOne/:data", async (req, res) => {
    try {
        var info = req.params.data
        info = info.split("$")
        const emailUser = info[0]
        const pass = cyrb53(info[1], 5)
        const snapshotU = await Ent.Usuario.get();

        snapshotU.forEach(doc => {
            var data = doc.data();
            if (data.email == emailUser && data.hash == pass) {
                res.send(data);
            }
        });
        console.log("GET de usuario con exito");
    } catch (error) {
        console.log("Error en GET usuario");
    }
});

app.get("/list", async (req, res) => {
    try {
        const snapshot = await Ent.Lista.get();
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.send(list);
        console.log("GET de todas las listas con exito");
    } catch (error) {
        console.log("Error en GET de todas las listas");
    }

});

app.get("/ListUser/:data", async (req, res) => {
    try {
        var info = req.params.data
        const iduser = info[0]
        const snapshotL = await Ent.Lista.where("id_user", "==", iduser).get();       
        res.send(listL);
        console.log("GET de listas filtrados con el id de usuario con exito");
    } catch (error) {
        console.log("Error en GET todos los recordatorios" + error);
    }
});

app.get("/ListgetID/:data", async (req, res) => {
    try {
        var listid = req.params.data
        const snapshot = await Ent.Lista.where(firebase.firestore.FieldPath.documentId(), "==", listid).get();
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(list)
        res.send(list);
        console.log("GET de listas filtrados con el id de usuario con exito");
    } catch (error) {
        console.log("Error en GET todos los recordatorios" + error);
    }
});

app.get("/reminder", async (req, res) => {
    try {
        const snapshotR = await Ent.Recordatorio.get();
        const listR = snapshotR.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.send(listR);
        console.log("GET de todas los recordatorios con exito");
    } catch (error) {
        console.log("Error en GET todos los recordatorios");
    }
});

app.get("/reminderListName/:data", async (req, res) => {
    try {
        var info = req.params.data
        const snapshotL = await Ent.Lista.where("name", "==", info).get();
        const listL = snapshotL.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const objL = listL.reduce((a, c) => ({...a, ...c}), {});
        console.log(objL);
        const snapshotR = await Ent.Recordatorio.where("id_list", "==", objL.id).get();
        const listR = snapshotR.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(listR);       
        res.send(listR);
        console.log("GET de los recordatorios filtrados con id lista con exito");
    } catch (error) {
        console.log("Error en GET todos los recordatorios filtrados" + error);
    }
});

app.get("/reminderList/:data", async (req, res) => {
    try {
        var idlist = req.params.data
        const snapshotR = await Ent.Recordatorio.where("id_list", "==", idlist).get();
        const listR = snapshotR.docs.map((doc) => ({ id: doc.id, ...doc.data() }));       
        res.send(listR);
        console.log("GET de los recordatorios filtrados con id lista con exito");
    } catch (error) {
        console.log("Error en GET todos los recordatorios filtrados" + error);
    }
});



//POST (Create)
app.post("/createUser", async (req, res) => {
    try {
        const data = req.body;
        const snapshot = await Ent.Usuario.where("email", "==", data.email).get();
        const does_exist = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        if (does_exist.length == 0) {
            await Ent.Usuario.add({
                email: data.email,
                hash: cyrb53(data.hash, 5),
                signature: data.signature
            });
            res.send({ msg: "Usuario registrado correctamente" });
            console.log("Usuario registrado correctamente");
        }
        else {
            res.send({ msg: "Usuario ya existente" });
            console.log("Usuario ya existente");
        }
    } catch (error) {
        console.log("Error en POST de usuario");
    }

});
app.post("/createList", async (req, res) => {
    try {
        const dataL = req.body;
        await Ent.Lista.add(dataL);
        res.send({ msg: "Lista registrada correctamente" });
        console.log("Lista registrada correctamente");
    } catch (error) {
        console.log("Error en POST de Lista")
    }
});
app.post("/createReminder", async (req, res) => {
    try {
        const dataR = req.body;
        console.log(dataR);
        await Ent.Recordatorio.add({
            id_list: dataR.id_list,
            content: dataR.content,
            day: dataR.day,
            month: dataR.month,
            year: dataR.year,
            Timestamp: Date.now()
        });
        res.send({ msg: "Recordatorio registrado correctamente" });
        console.log("Recordatorio registrado correctamente");
    } catch (error) {
        console.log("Error en POST de Recordatorio");
    }
});

//Update
app.post("/update", async (req, res) => {
    try {
        const id = req.body.id;
        delete req.body.id;
        const data = req.body;
        await Ent.Usuario.doc(id).update(data);
        res.send({ msg: "Usuario actualizado" });
        console.log("Usuario actualizado");
    } catch (error) {
        console.log("Error UPDATE usuario");
    }
});

// Delete
app.delete("/deleteUser/:data", async (req, res) => {
    try {
        const info = req.params.data;
        console.log(info);
        const email = info[0];
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
        console.log(msg);
    } catch (error) {
        console.log("Error DELETE en usuario");
    }
});

app.delete("/deleteReminder/:data", async (req, res) => {
    try {
        var info = req.params.data;
        info = info.split("$")
        console.log(info);
        const idList = info[0];
        const day = info[1];
        const month = info[2];
        const year = info[3];

        // dateComplete = dateComplete.split("$");
        // const date = dateComplete[0].split("-");
        // const hour = dateComplete[1];


        // console.log(dateFirebase);

        var mns = "Recordatorio No Existente";

        const snapshot = await Ent.Recordatorio.get();
        snapshot.forEach(doc => {
            var data = doc.data();
            if (data.id_list == idList &&
                data.day == day && data.month == month && data.year == year) {
                Ent.Recordatorio.doc(`${doc.id}`).delete();
                mns = "Recordatorio Eliminado"
            }
        });

        res.send({ msg: mns });
        console.log(msg);
    } catch (error) {
        console.log("Error en DELETE en Recordatorio");
    }
});

app.delete("/deleteList/:data", async (req, res) => {
    try {
        var info = req.params.data;
        info = info.split("$")
        console.log(info)
        const idList = info[0];
        const idUser = info[1];
        const name = info[2];

        var mns = "Lista No Existente";

        const snapshotRec = await Ent.Recordatorio.get();
        const snapshot = await Ent.Lista.get();
        snapshot.forEach(doc => {
            var data = doc.data();
            if (doc.id == idList || (data.id_user == idUser && data.name == name)) {
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
        console.log(mns);
    } catch (error) {
        console.log("Error en DELETE de lista");
    }
});

app.listen(8080, () => console.log("Server iniciado en el puerto 8080"));