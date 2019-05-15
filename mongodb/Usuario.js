let { mongoose } = require('./mongodb-connect');

let jwt = require('jsonwebtoken');

let userSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        unique: true
    },
    usuario: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    token: {
        type: String,
        required: true
    },
    acceso: {
        type: String,
        enum: ["registrado", "admin"],
        required: true,
    }
});

userSchema.methods.generateToken = function () {
    let user = this;
    let token = jwt.sign({
        _id: user._id.toHexString(),
        acceso: user.acceso
    },
        'claveSecreta',
        { expiresIn: 60 * 60 }).toString();
    return token;
}

//holaladjflskjf
userSchema.statics.createUserAndCreateToken = function (id, usuario, password, email) {
    let User = this;
    return new Promise((resolve, reject) => {
        let newUser = new User({
            id: id,
            email: email,
            usuario: usuario,
            password: password,
            token: "0000",
            acceso: "registrado"
        });
        newUser.save().then((doc) => {
            let newToken = newUser.generateToken();
            User.updateOne({ usuario: usuario }, { token: newToken }).then((doc) => {
                resolve(newToken);
            }).catch((er) => {
                console.log(er);
                reject({ error: "error al actualizar" });
            });
        }).catch((err) => {
            console.log(err);
        });
    });
}

userSchema.statics.validarUsuario = function (usuario, password) {
    let User = this;
    console.log(usuario + ' w ' + password);
    return new Promise((resolve, reject) => {
        User.findOne({
            usuario: usuario, password: password
        }).then((user) => {
            if (user) {
                console.log(user);
                let newToken = user.generateToken();
                User.updateOne({ usuario: usuario }, { token: newToken }).then((doc) => {
                    resolve(newToken);
                }).catch((er) => {
                    console.log(er);
                    reject({ error: "error al actualizar" });
                })
            } else {
                reject({ error: "no existe email" })
            }
        }).catch((err) => {
            console.log(err);
            reject({ error: "no se encontró" })
        })
    })

}

userSchema.statics.verificarToken = function (token) {
    let User = this;
    let usr = jwt.decode(token);
    console.log(usr);

    return new Promise((resolve, reject) => {
        User.findById(usr._id).then((user) => {
            if (token == user.token) {
                jwt.verify(token, 'claveSecreta', (err, decoded) => {
                    if (err) {
                        if (err.name == "TokenExpiredError") {
                            console.log("token expirado");
                        } else {
                            console.log("error al verificar token");
                        }
                        return reject(err);
                    } else {
                        return resolve(decoded);
                    }
                })
            } else {
                return reject({ error: "token no es igual al de la base de datos" });
            }

        })
    })
}

userSchema.statics.verDatosToken = function (token) {
    return jwt.decode(token);
}

userSchema.statics.getCurrentUserID = function (token) {
    let User = this;
    console.log('Token to look for: ' + token);

    return new Promise((resolve, reject) => {
        User.findOne({ token: token }).then(user => {
            if (user == undefined) {
                console.log('No se encontró el usuario');
                reject();
            } else {
                console.log(user.id + ' is the current user.');
                resolve(user.id);
            }
        });
    });
}

let Usuario = mongoose.model('usuarios', userSchema);


// let newUser = new User({email: 'stephen@heaven.com',
//                         usuario: 'ElSteve',
//                         password: "hawking",
//                         token: "1233",
//                         acceso: "registrado"});

// newUser.save().then((doc) =>  {
//     console.log(doc);
// }).catch((err) => {
//     console.log(err);
// });
module.exports = { Usuario };