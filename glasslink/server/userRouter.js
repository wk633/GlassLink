const Router = require('express').Router();
const mongoose = require('mongoose');
const conn = mongoose.createConnection(require('./config').DB);
const User = require('./model/user')(conn);

Router.get('/info', (req, res)=>{
    const {userId} = req.cookies;
    if(!userId){
        return res.json({code: 1, errmsg: 'no cookies'})
    }
    User.findOne({'_id': userId}, (err, doc)=>{
        if(err){
            return res.json({code: 1, errmsg: 'db error'});
        }else{
            return res.json({code: 1, data: doc})
        }
    })
})

module.exports = Router;