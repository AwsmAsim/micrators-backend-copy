const bodyParser = require('body-parser');
const express = require('express')
const PORT = 3000;
const db = require('./utils/db');
const user = require('./controller/controllers.user')
const bill = require('./controller/controllers.bills');
const customer = require('./controller/controllers.customer');
const stock = require('./controller/controllers.stock')
const transaction = require('./controller/controllers.transaction')
app = express();

app.use(bodyParser.urlencoded({extended: false}))

// middleware
app.use(bodyParser.json())

// COMPLETED
app.use('/user', user);
// COMPLETED
app.use('/bill', bill);
// COMPLETED
app.use('/customer', customer)
// COMPLETED
app.use('/stock', stock)
app.use('/transaction', transaction)

// // Test database
// getPos = async ()=>{
//     const result = await db.executeQuery('Select pos_id, city_id from pos');
//     console.log(result);
// }
// getPos()

// Test run
app.get('/',(req,res)=>{
    res.send('Application is running...')
})

app.listen(PORT, ()=>{console.log('Application is running...')})