const Router = require('express').Router();

Router.get('/info', (req, res)=>{
    const {userId} = req.cookies;
    if(!userId){
        return res.json({code: 1, errmsg: 'no cookies'})
    }
})

module.exports = Router;