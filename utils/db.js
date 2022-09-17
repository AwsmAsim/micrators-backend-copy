const mysql = require('mysql2');
require('dotenv').config()
const bluebird = require('bluebird');


const pool = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'root',
    database: 'MI_BILLING_APP_DB',
    Promise: bluebird,
    multipleStatements: true
});



// const pool = mysql.createConnection(process.env.DATABASE_URL)

const promisepool = pool.promise();

const connection = promisepool

module.exports = {
    executeQuery: async (sql, sqlParam, callback)=>{
        if(sqlParam == null){

            var [result, fields] = await (await connection).execute(sql);
            return result;
        }
        else
        {
            
            var [result, fields] = await (await connection).execute(sql, sqlParam)
            .catch((err)=>{
                console.log(err)
                result = null
                return [null, null]
            })

            // console.log(`result: ${result}`)

            return result;

        } 
    },
    // queries = [{sql: , sqlParam: }, ...]
    executeTransaction: async (queries)=>{
        const connInstance = await (await connection);
        await connInstance.beginTransaction();
        var errorOccured = false;

        for(var query of queries){
            console.log(query)
            try {
                if(query.sqlParam == null){
    
                    var [result, fields] = await connInstance.execute(query.sql)
                    .catch((err)=>{
                        connInstance.rollback();
                        throw Error('Transaction Rollbacked');
                        return [null, null];
                    });
                }
                else
                {
                    
                    var [result, fields] = await connInstance.execute(query.sql, query.sqlParam).catch((err)=>{
                        console.log(err)
                        connInstance.rollback();
                        throw Error('Transaction Rollbacked');
                        result = null
                        return [null, null]
                    })
                    console.log('result: ')
                    console.log(result)
        
                } 
            }catch(err){
                errorOccured = true;
                console.log('Error caled from db.js')
                console.log(err)
                connInstance.rollback();
                throw Error('Transaction Rollbacked');
                return;
            }

        }

        await connInstance.commit().catch((err)=>{
            console.log(err);
            connInstance.rollback();
            throw Error('Error occured during commit');
        })
    }
}
