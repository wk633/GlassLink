const mongoose = require('mongoose');
const conn = mongoose.createConnection(require('../../config').DB.URL);
const Job = require('../../models/job')(conn);
const Notification = require('../../models/notification')(conn);
const User = require('../../models/user')(conn);

async function main(){
    try{
        const dJob = await Job.find({});
        const dUser = await User.find({});
        let data = [];
        dUser.map(item=>{
            const userId = item._id;
            dJob.map(d=>{
                let tt = {
                    userId,
                    jobId: d._id,
                    postDate: d.postDate,
                    source: d.source,
                    status: 'unread'
                }
                data.push(tt);
            })
        })
        console.log(data.length)
        await Notification.collection.insert(data);
        await conn.close();
    }catch(e){
        console.log(e);
        process.exit();
    }
}
main();