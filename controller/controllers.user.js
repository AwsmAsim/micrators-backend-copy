const router = require('express').Router();
const userModel = require('../model/models.user');


router.post('/', async (req, res)=>{

    var resBody = req.body;
    try{
        var user = await userModel.getUser(
            req.body.username, req.body.password)
        if(user == null) res.status(404).send(
            {"error": "User not found"}
        )
        res.status(200).send(user)
    }catch(err){
        res.status(501).send(
            {'error': 'Internal Error occured'}
        )
    }

})

module.exports = router;