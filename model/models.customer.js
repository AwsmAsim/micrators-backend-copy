const db = require('../utils/db');


module.exports = {
    getDetails : async (cus_ph)=>{
        try{
            var cus_details = await db.executeQuery('Select * from customer where cus_ph = ?', [cus_ph]);
            
            return cus_details[0];
        }catch(err){
            console.log(err);
            throw Error('Internal error occured');
        }
    },

    getPhoneNoFromTransactionId: async(transaction_id)=>{
        try{
            var cus_details = await db.executeQuery('Select cus_ph from customer where transaction_id = ?', [transaction_id]);
            
            return cus_details[0];
        }catch(err){
            console.log(err);
            throw Error('Internal error occured');
        }
    },

    setDetails: async (cus_ph, cus_name, email, address)=> {
        try{
            var cus_details = await db.executeQuery('INSERT INTO customer VALUES(?,?,?,?,?)', [cus_ph, cus_name, email, 0, address]);
            return true;
        }catch(err){
            console.log(err);
            throw Error('Internal error occured');
        }
    }
}