const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    'userId': {type: ObjectId},
    'jobId': {type: ObjectId},
    'postDate': {type: Date},
    'status': {type: String}
});

module.exports = function(conn){
    return conn.model(
       'Notification', schema
    )
}