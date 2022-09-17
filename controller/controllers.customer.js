const router = require('express').Router();
const customerModel = require('../model/models.customer');


router.get('/:cus_ph', async (req, res)=>{

    var cus_ph = req.params.cus_ph;
    try{
        var cus_details = await customerModel.getDetails(cus_ph);
        // console.log(cus_details);
        if(cus_details.email == undefined || cus_details == null){
            res.status(404).send({
                "error" : "Customer does not exist" 
            })
            res.end()
        }else{
            res.status(200).send(cus_details);
        }
    }catch(err){
        res.status(500).send({
            "error" : err,
        })
    }

})

router.post('/', async (req, res)=>{

    var cus_ph = req.body.cus_ph;
    var cus_name = req.body.cus_name;
    var email = req.body.email;
    var address = req.body.address;

    try{
        var cus_details = await customerModel.setDetails(cus_ph, cus_name, email, address);

        if(cus_details == false){
            res.status(404).send({
                "error" : "Customer does not exist" 
            })
            res.end()
        }else{
            res.status(200).send({
                cus_ph : req.body.cus_ph,
                cus_name : req.body.cus_name,
                email : req.body.email,
                address : req.body.address
            });
        }
    }catch(err){
        res.status(500).send({
            "error" : err,
        })
    }



})

module.exports = router;