const router = require('express').Router()
const stockModel = require('../model/models.stock')


router.get('/:stock_id', async (req,res)=>{

    try{
        var response = await stockModel.getStockInTheStore(req.params.stock_id);
        console.log(response);
        console.log(req.params.stock_id);
        if(response == null || response.length == 0 ){
            res.status(404).send({
                "error" : "Data not Found"
            })
        }
        else{
            res.status(200).send(response)
        }
    }catch(err){
        console.log(err)
        res.status(500).send({
            "error" : "Internal Error"
        })
    }
})

module.exports = router;