const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    'user': {type: String},
    'pwd': {type: String}
});

module.exports = function(conn){
    return conn.model(
       'User', schema
    )
}