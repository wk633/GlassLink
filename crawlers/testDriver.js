const utils = require('./utils');
const data = require('./mockData');

data.data.map(item=>{
    item.postDate = utils.postDateGen(item.postDateRaw)
    item.identifier = utils.identifierGen(item.company, item.job, item.location, item.postDate);
})
// console.log(data.data);

const model = require('../models/model');
const Linkedin = model.getModel('linkedin');
console.log(Linkedin);
function saveTest(){
    data.data.map((item)=>{
        linkedinModel = new Linkedin(item);
        linkedinModel.save((e, d)=>{
            if(e) {
                console.log(e);
            }else{
                console.log(d);
            }
        })
    })
}
saveTest();