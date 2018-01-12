const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    '_id': {type: mongoose.Schema.Types.ObjectId, ref: 'Notification'},
    'company': {type: String},
    'job': {type: String},
    'location': {type: String},
    'postDate': {type: Date},
    'source': {type: String, index: true},
    'desc': {type: String},
    'identifier': {type: String, index: true},
    'logoUrl': {type: String},
    'detailUrl': {type: String}
});

module.exports = function(conn){
    return conn.model(
       'job', schema
    )
}