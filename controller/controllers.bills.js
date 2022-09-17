const router = require("express").Router();
const billModel = require("../model/models.bill");
const emailSender = require("../script/send_email")
const printBill = require("../script/bill_maker")

router.post("/", async (req, res) => {

/*
Received JSON

{
    pos_id: ...,
    bills :[
            {
                total_amount: ...,
                cus_ph: ...,
                discount: ...,
                offline_payment: True/False,
                billItems: [
                    {
                        serial_no: ,
                        date: ,
                        cost: ,
                        warranty_id: ,
                    },
                    {
                        ""
                    }
                    ...
                ]
            },
            ...
        ]
}

*/

//   console.log(req.body)
//   console.log(req.body.bills)
//   console.log(req.body.pos_id)
  try {
    var transaction_details = await billModel.makeBill(
      req.body.bills,
      req.body.pos_id
    );

        console.log(transaction_details);

    if(transaction_details.succesful){
        res.status(200).send(transaction_details);
    }else {
        res.status(400).send(transaction_details);
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Internal Error",
      transaction_id: "",
      successs: false,
    });
  }
});



router.post('/send_email', (req, res)=>{

  const transaction_ids = req.body.transaction_ids;
  
  try{
    const failedTransactions = billModel.generateBill(transaction_ids);
    if(failedTransactions.length == 0){
      
      res.status(200).send({
        status : true,
        failedTransactions: failedTransactions
      });
    }else{
      res.status(200).send({
        status : false,
        failedTransactions: failedTransactions
      });
    }
  }catch(err){
    console.log(err)
    res.status(500).send({
      error: "Internal Error"
    })
  }

})

module.exports = router;

