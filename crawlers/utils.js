const utility = require('utility');

function identifierGen(company, job, location, postDate){
    const year = postDate.getFullYear();
    const month = postDate.getMonth() + 1;
    const day = postDate.getDate();
    const comb = `${company}+${job}+${location}+${year}+${month}+${day}`;
    return utility.md5(comb)
}


function postDateGen(rawPostDate){
    const nowDate = new Date();
    let delta = 0;
    // NEW = 1d means today
    if(rawPostDate != 'NEW'){
        delta = parseInt(rawPostDate.substring(0, rawPostDate.length - 1)) - 1;
    }
    const adjusted = new Date(nowDate - delta * 1000*60*60*24);
    return adjusted;
}

module.exports = {
    identifierGen,
    postDateGen
}