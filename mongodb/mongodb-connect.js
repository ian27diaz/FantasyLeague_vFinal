'use strict'
const mongoose = require('mongoose');

let mongoDB = 'mongodb+srv://oracle:oracle@cluster0-fr8vo.mongodb.net/FantasyLeague?retryWrites=true';

mongoose.connect(mongoDB,{ useNewUrlParser: true });
let db = mongoose.connection;

module.exports = {mongoose};