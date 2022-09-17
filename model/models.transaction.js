const db = require('../utils/db');


module.exports = {
    getAllTransactions: async ()=>{
    
        var query = 'select * from transaction'
        try{
            const user = await db.executeQuery(query);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    
    },

    getLastTenTransactions: async (pos_id)=>{
        var query = 'SELECT * FROM TRANSACTION Natural Join Customer where pos_id = ? limit 10';

        try{
            return await db.executeQuery(query, [pos_id]);
        }catch(err){
            console.log(err);
            throw Error('Internal Error')
        }
    }, 
    
    getAllStoreTransactions: async (store_id)=>{
        // All transactions done in store 2
        var query = 'select * from transaction where pos_id = (Select pos_id from pos Natural Join store where store id = ?)';
        try{
            const user = await db.executeQuery(query, [store_id]);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    },
    
    getAllOperatorTransactions: async (pos_id)=>{
        // eg: Get all transactions done by operator abc
        var query = 'select * from transaction where pos_id = ?'
        try{
            const user = await db.executeQuery(query, [pos_id]);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    },
    
    getAllCustomerTransactions: async (cus_ph)=>{
        // eg: All transactions done by customer xyz
        var query = 'select * from transaction Natural Join customer where cus_ph = ?'
        try{
            const response = await db.executeQuery(query, [cus_ph]);
            console.log(response)
            return response;
        }catch(err){
            console.log(err);
            throw Error('Internal Error')
        }
    },
    
    
    getTransactionsHeldInPreviousDays: (noOfDays)=>{
        // eg: All transactions done in last 2 days
        // TODO
    },
    
    getAllOperatorTransactionsInPreviousDays: (pos_id, prev_days)=>{
    
    },
    
    getAllCustomerTransactionsInPreviousDays: (customer_ph, prev_days)=>{
        // eg: Transation done by cus xyz in last 2 days
    },
    
    getAllStoreTransactionsInPreviousDays: (store_id, prev_days)=>{
    
    },
    
    getAllCustomerTransactionsDoneInStoreInPreviousDays: (customer_ph, store_id, prev_days)=>{
        // eg: All transactions done by customer xyz from store 2 in past 3 days.
    },
    
    getAllOperatorTransactionsDoneByCustomerInStoreInPreviousDays: (pos_id, customer_ph, store_id, prev_days)=>{
    
    },
    
    createTransaction: async (transaction_id, cus_ph, amount, items, pos_id, status)=>{
        var query = 'INSERT INTO transaction VALUES(?,?,?,?,?,?,?)';
        try{
            const user = await db.executeQuery(query, [transaction_id, cus_ph, amount, items, pos_id, status]);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }
}



