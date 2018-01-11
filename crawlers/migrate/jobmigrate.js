const mongoose = require('mongoose');
const conn = mongoose.createConnection(require('../../config').DB.URL);
const Job = require('../../models/job')(conn);
const Linkedin = require('../../models/linkedin')(conn);
const Glassdoor = require('../../models/glassdoor')(conn);

async function main(){
    try{
        let d = await Linkedin.find({});
        await Job.collection.insert(d);
        d = await Glassdoor.find({});
        await Job.collection.insert(d);
        await conn.close();
    }catch(e){
        console.log(e);
        process.exit();
    }
}
main();