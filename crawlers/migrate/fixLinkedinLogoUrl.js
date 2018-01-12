const mongoose = require('mongoose');
const conn = mongoose.createConnection(require('../../config').DB.URL);
const Job = require('../../models/job')(conn);
async function main(){
    try{
        const d = await Job.find({'source': 'linkedin'});
        await d.map(async (item)=>{
            if(item.logoUrl.startsWith('/')){
                let newLogoUrl = 'www.linkedin.com' + item.logoUrl;
                let id = item._id;
                
                try{
                    console.log(id, newLogoUrl);
                    await Job.update({'_id': id}, {$set: {logoUrl: newLogoUrl}}, {upsert: true});
                }catch(e){
                    console.log(e)
                }
                
            }
        })
        await conn.close();
    }catch(e){
        console.log(e);
    }
}
main();