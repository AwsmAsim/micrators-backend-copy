const db = require("../utils/db");
const Time = require("../controller/controllers.time_stamp");
const customerModel = require('./models.customer')
const billMaker = require('../script/bill_maker')
const htmlBillMaker = require('../script/bill_maker_from_html')
const emailSender = require('../script/send_email')

var generateBillLocal = async (transaction_ids = [])=>{
  // transaction_ids = ['transaction_id1', 'transaction_id2',...]

  var failedTransactions = []
  console.log('transaction_ids: ')
  console.log(transaction_ids)
  for(var transaction_id of transaction_ids){

    console.log(transaction_id)
    var demoSql = "select city_name, area_name, cus_name, bill.cus_ph, bill.pos_id, email, transaction.transaction_id, product_name, count(product_name) as quantity, cost, transaction.amount, bill.date as date from product natural join stock natural join bill natural join customer natural join pos natural join store natural join city natural join area inner join transaction on transaction.transaction_id = bill.transaction_id where bill.transaction_id = ? group by product_name";
    try{
      // var details = await db.executeQuery("select cus_name, cus_ph, email, transaction_id, product_name, count(product_name) as quantity, cost from product natural join stock natural join bill natural join customer natural join pos natural join store where transaction_id = '? group by product_name;", [transaction_id]);
      var details = await db.executeQuery(demoSql, [transaction_id]);
      console.log(`details: ${details}`)
    }catch(err){
      console.log(err)
      failedTransactions.push(transaction_id)
    }
    
    var productAndCost = []
    var date = ''
    var cus_ph = ''
    var cus_name = ''
    var quantity = ''
    var amount = 0
    var city_name = '', area_name = '', quantity = ''
    var store_name = await db.executeQuery('Select store_name from pos natural join store where pos_id = ?', [details[0].pos_id])
    console.log(store_name)
    console.log(store_name[0])
    store_name = store_name[0].store_name
    var email = ''
    for(var detail of details){
      console.log(detail)
      city_name = detail.city_name
      area_name = detail.area_name
      cus_name = detail.cus_name
      date = detail.date
      quantity = detail.quantity
      cus_ph = detail.cus_ph
      amount = detail.amount
      email = detail.email
      quantity = detail.quantity;

      productAndCost.push({
        item: detail.product_name,
        quantity: quantity,
        price: detail.cost
      })
    }

    await htmlBillMaker.generatePdf(store_name,city_name,cus_name,cus_ph,email,productAndCost,amount,transaction_id);
    // billMaker.printPdf(store_name, productAndCost, amount, String(date), transaction_id);
    // await emailSender.sendBillEmail(email)
  }

  return failedTransactions;

}

removeChar = (givenString, ch)=>{

    newString = ''

    for(var i = 0; i < givenString.length; i++){
        if(givenString[i] == ch) continue;
        newString += givenString[i]
    }

    return newString
}

filterTransactionId = (initialGeneratedId)=>{
    // intialGeneratedId = '2022091318:23:38DLH_01_01_3SDK34'
    initialGeneratedId = removeChar(initialGeneratedId, ':')
    initialGeneratedId = removeChar(initialGeneratedId, '_')
    return initialGeneratedId.substr(0, 21)
}

// ans = filterTransactionId('2022091318:23:38DLH_01_01_3SDK34')
// console.log(ans)

/*
Received JSON

{
    pos_id: ...,
    bills :[
            {
                total_amount: ...,
                cus_ph: ...,
                discount: ...,
                successful: ...,
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

var makePayment = ()=>{ return null;}

module.exports = {

  generateBill: async (transaction_ids = [])=>{
    // transaction_ids = ['transaction_id1', 'transaction_id2',...]

    var failedTransactions = []

    for(var transaction_id in transaction_ids){
      try{
        var details = db.executeQuery('Select product_name, cost, transaction.date, transaction.cus_ph, email, amount, store_name from product natural join stock Natural join bill NAURAL JOIN customer, transaction NATURAL JOIN pos Natural Join store where transaction.transaction_id = bill.transaction_id AND transaction.transaction_id = ?', [transaction_id]);
      }catch(err){
        console.log(err)
        failedTransactions.push(transaction_id)
      }
      
      var productAndCost = []
      var date = ''
      var cus_ph = ''
      var amount = 0
      var store_name = ''
      var email = ''
      var succesful = ''
      for(var detail of details){
        date = detail.date
        cus_ph = detail.cus_ph
        amount = detail.amount
        store_name = detail.store_name
        email = detail.email
        productAndCost.push({
          item: detail.product_name,
          price: detail.cost
        })
      }

      billMaker.printPdf(store_name, productAndCost, amount, date, transaction_id);
      emailSender.sendBillEmail(email)
    }

    return failedTransactions;

  },

  makePayment: () => {
    // Checks if the payment is succesful or not
  },

  makeBill: async (bills, pos_id) => {
    var failedTransactions = [];
    var transaction_ids = []
    var succesful_transactions = [];
    var serial_nos = new Set();

    // console.log(bills, pos_id)

    for(var bill of bills){
        // console.log('bill:')
        // console.timeLog(bill)
        // Bill items of one customer at a time.

        var time = new Time().getCurrentDate();
        var currentTime = time.getStringDate();
        var transaction_id = filterTransactionId(currentTime + pos_id);
        // console.log(transaction_id)
        var queries = [];
        var total_amount = bill.total_amount;
        var cus_ph = bill.cus_ph;
        var billItems = bill.billItems;
        var offline = bill.offline_payment;
        var succesful = bill.succesful

        // console.log(billItems)
        for (var itemBill of billItems) {

            // All items of that customer

            console.log('itemBill: ')
            console.log(itemBill)
          // Insert into bill
          queries.push({
            sql: "INSERT INTO BILL(transaction_id, cus_ph, serial_no, date, pos_id) VALUES(?, ?, ?, ?, ?)",
            sqlParam: [
              transaction_id,
              cus_ph,
              itemBill.serial_no,
              itemBill.date,
              pos_id,
            ],
          });

          // update stock item to sold
          queries.push({
            sql: "UPDATE stock SET SOLD = TRUE WHERE serial_no = ?",
            sqlParam: [itemBill.serial_no],
          });

          // insert active_warranty
          queries.push({
            sql: "INSERT INTO active_warranty VALUES (?, ?, ?, (SELECT utc_timestamp() + INTERVAL days_valid DAY from warranty where warranty_id = ?))",
            sqlParam: [
              itemBill.serial_no,
              cus_ph,
              itemBill.warranty_id,
              itemBill.warranty_id,
            ],
          });

          if(serial_nos.has(itemBill.serial_no) == false){
            var sql = "select product_id, product_name, count(product_id) as available, store_name, city_name from city natural join pos natural join store natural join stock natural join product where sold = 0 AND store_id = (SELECT store_id from pos where pos_id = ?) AND product_id = (Select product_id from stock where serial_no = ?) group by product_name"
            const leftOver = await db.executeQuery(sql, [pos_id, itemBill.serial_no])
            console.log(`leftOver: ${leftOver}`)
            if(leftOver[0].available <= 3){
              emailSender.sendStockEmail('facebook.asim159@gmail.com', leftOver[0].product_name, leftOver[0].product_id, leftOver[0].store_name, leftOver[0].city_name, pos_id)
            }
          }


        }
    
            /*
                1. Decrement the item with serial_no from stock. 
                2. Add the warranty period in active warranty table.
                3. Report if stock is ending.
                4. Send PDF
            */
        
        // create transaction 
        queries.push({
          sql: "INSERT INTO Transaction(transaction_id, cus_ph, amount, items, pos_id, status, offline_payment,discount) VALUES(?,?,?,?,?,?,?,?)",
          sqlParam:
            [transaction_id, cus_ph, total_amount, billItems.length, pos_id, succesful, bill.offline_payment, bill.discount],
        });

        transaction_ids.push(transaction_id);
        

        try {
            if(!bill.offline){
                makePayment();
            }
            // console.log(queries)
            await db.executeTransaction(queries);

            succesful_transactions.push(transaction_id);

        } catch (err) {
            console.log('Error caled from model.bill')
            console.log(err);
            db.executeQuery(
                "INSERT INTO Transaction(transaction_id, cus_ph, amount, items, pos_id, status) VALUES(?,?,?,?,?,?)",
                [transaction_id, cus_ph, total_amount, queries.length, pos_id, false]
            );
            failedTransactions.push({
                "transaction_id": transaction_id,
                "bill" : bill
            });
        }
        
    }

    console.log(await db.executeQuery('Select * from transaction'));
    console.log(await db.executeQuery('Select * from bill'))
    await generateBillLocal(succesful_transactions)

    if(failedTransactions.length == bills.length) return {
        "succesful" : false,
        "failed_transactions" : failedTransactions,
        "succesful_transactions" : succesfulTransactions,
        "transaction_ids" :  transaction_ids
    }
    else return {
        "succesful" : true,
        "failed_transactions" : failedTransactions,
        "transaction_ids" :  transaction_ids
    }
    
  },
};
