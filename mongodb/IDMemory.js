let { mongoose } = require('./mongodb-connect');


let IDMemorySchema = mongoose.Schema({
    IDMem: {
        type: Number,
        required: true
    },
    IDUsuario: {
        type: Number,
        required: true,
        unique: true
    },
    IDEquipo: {
        type: Number,
        required: true,
        unique: true
    }
})


IDMemorySchema.statics.getNextUserID = function(){
    let IDMem_ = this;
    return new Promise((resolve, reject) => {
        IDMem_.findOne({IDMem: 1}).then(data => {
            console.log('IN IDMemory');
            console.log(data);
            if(data){
                let newID = data.IDUsuario + 1;
                IDMem_.updateOne({ IDMem: data.IDMem }, { IDUsuario: newID}).then((doc) => {
                    resolve(newID);
                }).catch((er) => {
                    console.log(er);
                    reject({ error: "error al actualizar" });
                })
            } else {
                reject();
            }
        }).catch((err) => {
            console.log(err);
            reject({ error: "no se encontró" })
        });
    }); 
}

IDMemorySchema.statics.getNextEquipoID = function(){
    let IDMem_ = this;
    return new Promise((resolve, reject) => {
        IDMem_.findOne({IDMem: 1}).then(data => {
            console.log('IN IDMemory');
            console.log(data);
            if(data){
                // let data2 = Object.assign({}, data);
                // console.log(data2);
                // console.log(data2.IDEquipo);
                // console.log('DATA EXISTS ' + data);
                // console.log(JSON.parse(JSON.stringify(data)).IDEquipo);
                let newID = data.IDEquipo + 1;
                console.log('IN IDMEMORY');
                console.log(newID);
                // console.log(data.IDEquipo);
                // console.log(data.IDUsuario);
                IDMem_.updateOne({ IDMem: data.IDMem }, { IDEquipo: newID}).then((doc) => {
                    resolve(newID);
                }).catch((er) => {
                    console.log(er);
                    reject({ error: "error al actualizar" });
                })
            } else {
                reject();
            }
        }).catch((err) => {
            console.log(err);
            reject({ error: "no se encontró" })
        });
    }); 
}

let IDMemory = mongoose.model('IDMemory', IDMemorySchema);
// let newID = new IDMemory({IDMem: 1, IDUsuario: 18, IDEquipo: 42});

// newID.save().then((doc) =>  {
//     console.log(doc);
// }).catch((err) => {
//     console.log(err);
// });


module.exports = { IDMemory };