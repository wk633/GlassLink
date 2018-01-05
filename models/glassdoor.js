const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    'company': {type: String},
    'job': {type: String},
    'location': {type: String},
    'postDate': {type: Date},
    'source': {type: String},
    'desc': {type: String},
    'identifier': {type: String, index: true},
    'logoUrl': {type: String},
    'detailUrl': {type: String}
});

module.exports = function(conn){
    return conn.model(
       'glassdoor', schema
    )
}