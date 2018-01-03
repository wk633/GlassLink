const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.DB.URL, ()=>{
    console.log(`connect DB ${config.DB.URL} success`);
});

const models = {
    'linkedin': {
        'company': {type: String},
        'job': {type: String},
        'location': {type: String},
        'postDate': {type: Date},
        'source': {type: String},
        'desc': {type: String},
        'identifier': {type: String, index: true},
        'logoUrl': {type: String},
        'detailUrl': {type: String}
    }
};

for (let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel: (name)=>mongoose.model(name)
}