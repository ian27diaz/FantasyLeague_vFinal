let { mongoose } = require('./mongodb-connect');

let equipoSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        unique: true
    },
    escudo: {
        type: String,
        required: true,
        trim: true,
        minlength: 0,
    },
    propietario: {
        type: Number,
        required: true
    },
    liga: {
        type: Number,
        required: true
    },
    partidosGanados: {
        type: Number,
        required: true
    },
    partidosEmpatados: {
        type: Number,
        required: true
    },
    partidosPerdidos: {
        type: Number,
        required: true
    },
    puntosFavor: {
        type: Number,
        required: true
    },
    puntosContra: {
        type: Number,
        required: true
    },
    presupuesto: {
        type: Number,
        required: true
    },
});

equipoSchema.statics.createEquipo = function (id_, nombre_, usuario_) {
    let Equipo = this;
    return new Promise((resolve, reject) => {
        let newEquipo = new Equipo({
            id: id_,
            nombre: nombre_,
            escudo: 'assets/images/EscudosEquipos/EscudoEquipo-1.jpg',
            propietario: usuario_,
            liga: 99999,
            partidosGanados: 0,
            partidosEmpatados: 0,
            partidosPerdidos: 0,
            puntosFavor: 0,
            puntosContra: 0,
            presupuesto: 500000
        });
        newEquipo.save().then((doc) => {
            resolve(newEquipo);
        }).catch((err) => {
            console.log(err);
            reject({ error: "error al crear equipo" });
        });
    });
}

equipoSchema.statics.getEquiposDeUsuario = function (idUsuario) {
    let Team = this;
    console.log('ID de usuario: ' + idUsuario);
    return new Promise((resolve, reject) => {
        let equipos = Team.find({ propietario: idUsuario });
        // console.log(equipos);
        if (equipos) {
            resolve(equipos.exec());//.equipo
        } else {
            console.log('No se encontraron equipos');
            reject();
        }

    });
}

let Equipo = mongoose.model('equipos', equipoSchema);

module.exports = { Equipo };