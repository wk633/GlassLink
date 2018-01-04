const config = require('../config');
const mongoose = require('mongoose');
mongoose.Promise=global.Promise;

const db = mongoose.createConnection(config.DB.URL);

db.on('error', (err)=>{
    if(err) throw err;
})

db.once('open', ()=>{
    console.log('db connected successfully');
})

module.exports = db;