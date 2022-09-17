const router = require('express').Router()
const transactionModel = require('../model/models.transaction')

router.get('/:pos_id', async (req, res)=>{
    try{
        console.log(req.params.pos_id)
        var response = await transactionModel.getLastTenTransactions(req.params.pos_id);
        console.log(response)
        if(response == null || response.length == undefined){
            res.status(404).send([]);
        }else{
            res.status(200).send(response);
        }

    }catch(err){
        console.log(error);
        res.status(500).send({
            "error": "Unable to retrieve"
        });
    }
})



router.get('/customer/:cus_ph', async (req,res)=>{

    var cus_ph = Number(req.params.cus_ph);
    console.log(cus_ph)
    try{

        var response = await transactionModel.getAllCustomerTransactions(cus_ph);
        if(response == null || response.length == undefined){
            res.status(404).send([]);
        }else{
            res.status(200).send(response);
        }

    }catch(err){
        console.log(error);
        res.status(500).send({
            "error": "Unable to retrieve"
        });
    }
})

module.exports = router;