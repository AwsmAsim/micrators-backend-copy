var html_to_pdf = require('html-pdf-node');
var fs = require('fs');
var path = require('path')
var emailSender = require('./send_email')

// Example of options with args //
// let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };




var createHeading = (store_name, city_name, customer_name, cus_ph, email)=>{

    var heading = `<center style = "font-size: 30;">${store_name}</center>
    
    <center>----------------------------</center>
    <center> ${city_name}</center>
    
    <p>2022-09-13</p>
    <p>Name: ${customer_name}<br>Phone: ${cus_ph}<br>Email: ${email} </p>
    `
    return heading 
}

// let file = { content: `<center style = "font-size: 30;">MI Store</center>

// <center>----------------------------</center>
// <center> Panki, Kanpur</center>

// <p>2022-09-13</p>
// <p>Name: Asim<br>Phone: 764823479<br>Email: glintarman@gmail.com </p>
// <p>Items Details:   </p>
//  <table width = "100%" >
//         <tr align="left">
//             <th>Item Name</th>
//             <th>Qty</th>
//             <th>Rate</th>
//             <th>Amount</th>
//         </tr>
//         <tr>
//             <td>MI Note 11 5G</td>
//             <td>1</td>
//             <td>15000</td>
//             <td>15000</td>
//         </tr>
//         <tr>
//             <td>Mi Notebook</td>
//             <td>1</td>
//             <td>48000</td>
//             <td>48000</td>
//         </tr>
//         <tr>
//             <td colspan="2"></td>
//             <th align="left">Total :   </th>
//             <th align="left">63000</th>
//         </tr>

//     </table>

// <hr>
// <p>Transaction Id: 5783579904u2934<br>Thank you, VISIT AGAIN </p>`
// };

var insertItemsAndPrices = (ItemPriceList)=>{
    // itemPriceList = {item: itemName, quantity: quantity, price: price}
    var tableHeaders = `<p>Items Details:   </p>
    <table width = "100%" >
            <tr align="left">
                <th>Item Name</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
            </tr>`


    var tableData = ''

    for(var itemPrice of ItemPriceList){
        var q = Number(itemPrice.quantity)
        var p = Number(itemPrice.price)
        tableData +=
            `<tr>
                <td>${itemPrice.item}</td>
                <td>${itemPrice.quantity}</td>
                <td>${itemPrice.price}</td>
                <td>${p*q}</td>
            </tr>`
    }
    
    var content = tableHeaders.concat(tableData) 
    return content
    
}
var tableBase = (total_amount, transaction_id)=>{
    var base = `

    <tr>
                    <td colspan="2"></td>
                    <th align="left">Total :   </th>
                    <th align="left">${total_amount}</th>
                </tr>
    </table>

    <hr></hr>
    <p>Transaction Id: ${transaction_id}<br>Thank you, VISIT AGAIN </p>
    `

    return base;

}



module.exports = {
    generatePdf: async (store_name, city_name, customer_name, cus_ph, email, ItemPriceList, total_amount, transaction_id)=>{
        let options = { format: 'A4' };
        var content = ''
        content += createHeading(store_name, city_name, customer_name, cus_ph, email)
        content += insertItemsAndPrices(ItemPriceList)
        content += tableBase(total_amount, transaction_id)
        let file = {content: content}
        html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
            // console.log("PDF Buffer:-", String(pdfBuffer));
            fs.writeFileSync(path.join(__dirname, '../text-files/bill.pdf'), pdfBuffer)
            emailSender.sendBillEmail(email)
        });
    }
}