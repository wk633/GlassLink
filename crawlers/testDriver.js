const utils = require('./utils');
const data = require('./mockData');

data.data.map(item=>{
    item.postDate = utils.postDateGen(item.postDateRaw)
    item.identifier = utils.identifierGen(item.company, item.job, item.location, item.postDate);
})
// console.log(data.data);


const mongoose = require('mongoose');
const conn = mongoose.createConnection(require('../config').DB.URL);
const Linkedin = require('../models/linkedin')(conn);

async function saveTest(){
    await Promise.all(data.data.map(async (item)=>{
        linkedinModel = new Linkedin(item);
        try{
            const d = await linkedinModel.save();
            console.log(d);
        }catch(e){
            console.log('error!!!');
            console.log(e);
        }
    }))
    await conn.close();

}
saveTest();