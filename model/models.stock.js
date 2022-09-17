const router = require('express').Router()
const db = require('../utils/db')

module.exports = {

    getStockInTheStore: async (store_id)=>{
        try{
            var response = await db.executeQuery('SELECT * FROM stock Natural Join Warranty Natural Join product WHERE store_id = ? order by serial_no', [store_id])
            var product_id 
            var serial_no, pos_id, SOLD, store_id, warranty_id, warranty_name, warranty_type, available_until, days_valid, product_name, category_name
            var cost

            jsonResponse = {}
            /*
            [
                serial_no1: {
                    product_id: ,
                    warranty: [
                        {
                            ...
                        },
                        {
                            ...
                        }
                    ]
                },
                ...
            ]
            */

            for(var record of response){
                if(jsonResponse.serial_no != undefined){
                    jsonResponse.serial_no.warranty.push({
                        warranty_name: record.warranty_name,
                        warranty_id: record.warranty_id,
                        warranty_type: record.warranty_type,
                        days_valid: record.days_valid
                    });
                    continue;
                }
                var cur_serial_no = record.serial_no
                jsonResponse[cur_serial_no] = {
                    product_id: '', serial_no: record.serial_no,
                    SOLD: '', store_id: 0, warranty : [], product_name: '', category_name: '', cost: 0
                };
                jsonResponse[cur_serial_no].product_id = record.product_id
                jsonResponse[cur_serial_no].SOLD = record.SOLD,
                jsonResponse[cur_serial_no].store_id = store_id,
                jsonResponse[cur_serial_no].warranty = [{
                    warranty_name: record.warranty_name,
                        warranty_id: record.warranty_id,
                        warranty_type: record.warranty_type,
                        days_valid: record.days_valid
                }]
                jsonResponse[cur_serial_no].product_name = record.product_name
                jsonResponse[cur_serial_no].category_name = record.category_name
                jsonResponse[cur_serial_no].cost = record.cost
            }

            console.log(jsonResponse)
            return jsonResponse
        }catch(err){
            console.log(err);
            throw Error('Cannot Retrieve Stock')
        }
    }

}