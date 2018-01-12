const mongoose = require('mongoose');
const conn = mongoose.createConnection(require('../../config').DB.URL);
const Job = require('../../models/job')(conn);
async function main(){
    try{
        const d = await Job.find({'source': 'linkedin'});
        for(let i = 0; i < d.length; i++){
            let item = d[i];
            if(item.logoUrl.startsWith('www')){
                let newLogoUrl = 'http://www.linkedin.com' + item.logoUrl;
                let id = item._id;
                
                try{
                    console.log(id, newLogoUrl);
                    await Job.update({'_id': id}, {$set: {logoUrl: newLogoUrl}}, {upsert: true});
                }catch(e){
                    console.log(e)
                }
                
            }
        }
        await conn.close();
    }catch(e){
        console.log(e);
    }
}
main();