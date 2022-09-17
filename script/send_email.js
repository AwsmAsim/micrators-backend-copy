const nodeMailer = require('nodemailer')
const path = require('path');

var transporter = nodeMailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
        user: 'facebook.asim159@gmail.com',
        pass: 'tANzFSM2197nIV6D'
    }
});

sendStockEmail = (receiversEmailId, product_name, product_id, store_name, store_city, pos_id)=>{

    var mailHtml = `<h2 id="greeting-from-store-name-kanpur">Greeting from ${store_name}, ${store_city}</h2>
    <p>This is notify that stock of the following product is coming to an end.  </p>
    <ul>
    <li>product id: ${product_id}  </li>
    <li>product name: ${product_name}</li>
    </ul>
    <p>There are only two or less than two items of this product that are available at the store.</p>
    <p>With Regards,<br>${store_name}<br>pos id: ${pos_id}</p>
    `

    var mailOptions = {
        from: 'micrators@outlook.com',
        to: receiversEmailId,
        subject: 'MI Bill',
        text: "Thanks for shopping, here's your bill for future reference.",
        html: mailHtml
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }else{
            console.log('email sent: ', info.response);
            throw('Unable to send mail')
        }
    })
}

sendBillEmail = async (receiversEmailId)=>{
    
    var mailOptions = {
        from: 'micrators@outlook.com',
        to: receiversEmailId,
        subject: 'MI Bill',
        text: "Thanks for shopping, here's your bill for future reference.",
        attachments: [{ 
            path: path.join(__dirname, '../text-files/bill.pdf'),
            filename: 'bill.pdf'
        }]
    }
    
    await transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }else{
            console.log('email sent: ', info.response);
            throw('Unable to send mail')
        }
    })
}

module.exports = {sendBillEmail, sendStockEmail};



