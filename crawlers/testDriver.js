const utils = require('./utils');
const data = require('./mockData');

data.data.map(item=>{
    item.postDate = utils.postDateGen(item.postDateRaw)
    item.identifier = utils.identifierGen(item.company, item.job, item.location, item.postDate);
})
console.log(data.data);