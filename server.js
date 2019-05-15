const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;

let jsonParser = bodyParser.json();
let corsOptions = {
    origin: 'http://127.0.0.1:3000'
};

//MONGODB
let { Usuario } = require('./mongodb/Usuario');
let { Equipo } = require('./mongodb/Equipo');
let { IDMemory } = require('./mongodb/IDMemory');
let { Futbolista } = require('./mongodb/Futbolista');
//MONGODB

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(jsonParser);

function autenticar(req, res, next) {
    let token = req.get('x-auth');
    if (!token) {
        res.status(401).send({ error: "no hay token" });
        return;
    }

    User.verificarToken(token).then((user) => {
        console.log("Token verificado ...");
        req.userid = user._id;
        next();
    }).catch((err) => {
        res.status(401).send(err);
    });

}


app.route('/api/usuario/register')
    .post(async (req, res) => {
        let body = req.body;
        if (body.usuario && body.password && body.email) {
            try {
                let newID = await IDMemory.getNextUserID();
                let token = await Usuario.createUserAndCreateToken(newID, body.usuario, body.password, body.email);
                res.set('x-auth', token);
                res.send({ token: token });
            } catch (err) {
                console.log(err);
                res.status(402).send(err);
            }
        } else {
            res.status(400).send({ error: 'Faltan atributos' });
        }

    });


app.route('/api/equipo')
    .get(async (req, res) => {
        try {
            console.log(req.headers);
            console.log("team: ");
            console.log(req.get('x-idUser'));
            let equipos = await Equipo.getEquiposDeUsuario(req.get('x-idUser'));
            res.send({ equipos: equipos });
        } catch (err) {
            console.log(err);
            res.status(402).send(err);
        }
    })
    .post(async (req, res) => {
        let body = req.body;
        if (body.nombre && body.propietario) {
            try {
                let newID = await IDMemory.getNextEquipoID();
                console.log('IN API EQUIPO');
                console.log(newID);
                let equipo = await Equipo.createEquipo(newID, body.nombre, body.propietario);

                
                res.send({
                    // id: newID,
                    // nombre: equipo.nombre,
                    // escudo: equipo.escudo,
                    // propietario: equipo.propietario,
                    // liga: equipo.liga,
                    // partidosGanados: equipo.partidosGanados,
                    // partidosEmpatados: equipo.partidosEmpatados,
                    // partidosPerdidos: equipo.partidosPerdidos,
                    // puntosFavor: equipo.puntosFavor,
                    // puntosContra: equipo.puntosContra,
                    // presupuesto: equipo.presupuesto

                    equipo: equipo
                });
            } catch (err) {
                console.log(err);
                res.status(402).send(err);
            }
        }

    });

app.route('/api/usuario/login')
    .get(async (req, res) => {
        try {
            console.log(req.get('token'));
            let id = await Usuario.getCurrentUserID(req.get('token'));
            res.send({ id: id });
        } catch (err) {
            console.log(err);
            res.status(402).send(err);
        }
    })

    .post(async (req, res) => {
        let body = req.body;
        console.log('Body: \n' + req.body);
        if (body.usuario && body.password) {
            try {
                let token = await Usuario.validarUsuario(body.usuario, body.password);
                res.set('x-auth', token);
                res.send({ token: token });
            } catch (err) {
                console.log(err);
                res.status(401).send(err);
            }
        } else {
            res.status(400).send({ error: 'Faltan atributos' });
        }
    })



app.listen(port, () => console.log(`Example app listening on port http://127.0.0.1:${port}!`));