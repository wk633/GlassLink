const Router = require('express').Router();
const mongoose = require('mongoose');
const conn = mongoose.createConnection(require('./config').DB);
const User = require('./model/user')(conn);
const Notification = require('../../models/notification')(conn);
const Job = require('../../models/job')(conn);

const utils = require('utility');

Router.get('/info', (req, res)=>{
    const {userId} = req.cookies;
    if(!userId){
        return res.json({code: 1, errmsg: 'no cookies'})
    }
    User.findOne({'_id': userId}, (err, doc)=>{
        if(err){
            return res.json({code: 1, errmsg: err});
        }else{
            return res.json({code: 0, data: doc})
        }
    })
})

Router.post('/signup', (req, res)=>{
    const {user, pwd} = req.body;
    console.log(user, pwd);
    User.findOne({'user': user}, (err, doc)=>{
        if(err) return res.json({code: 1, errmsg: err});
        if(doc) return res.json({code: 1, errmsg: 'duplicate username'});
        const userModel = new User({user, pwd: md5pwd(pwd)});
        userModel.save((e, d) => {
            if(e){
                return res.json({code: 1, errmsg: e});
            }else{
                console.log(d);
                const {user, _id} = d;
                res.cookie('userId', _id);
                return res.json({code: 0, data: {user, _id}});
            }
        })
    })
})

Router.post('/login', (req, res)=>{
    const {user, pwd} = req.body;
    console.log(user, pwd);
    User.findOne({'user': user, 'pwd': md5pwd(pwd)}, (err, doc)=>{
        if(err) return res.json({code: 1, errmsg: err});
        if(doc) {
            const {user, _id} = doc;
            res.cookie('userId', _id);
            return res.json({code: 0, data:{user, _id}});
        }else{
            res.json({code:1, errmsg: 'username or password wrong'})
        }
    })
})

Router.get('/notification', (req, res)=>{
    const {userId} = req.cookies;
    let {start} = req.query;
    if(!start || parseInt(start, 0) < 0){start = 0}
    start = parseInt(start, 0);
    if(!userId) return res.json({code: 1, errmsg: 'no userId, please log in first'});
    Notification
    .find({'userId': '5a5686ca732cb113f4027d6b', 'status': 'unread'})
    .sort({'postDate': -1})
    .skip(start)
    .limit(30)
    .populate({
        path: 'jobId',
        model: Job // todo: Populating across Databases, need improve model import ways in the future
    })
    .exec((err, doc)=>{
        if(err) return res.json({code: 1, errmsg: err});
        return res.json({code: 0, data: doc})
    })

})

function md5pwd(pwd){
    const salt = "somecrazyrandomstringpassword@~~@";
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;