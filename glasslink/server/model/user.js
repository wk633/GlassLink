const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    'name': {type: String},
    'password': {type: String},
    'updateDate': {type: Date}
});

module.exports = function(conn){
    return conn.model(
       'User', schema
    )
}