const PDFDocument = require('pdfkit');
const fs = require('fs')
const path = require('path');
const { options, lineGap } = require('pdfkit');

const defaultFontSize = 15;



var printPdf = (titleName, itemPriceObject, total, date, transaction_id)=>{
    
    console.log(titleName)
    console.log( itemPriceObject)
    console.log( total)
    console.log(transaction_id)

    const doc = new PDFDocument()
    doc.pipe(fs.createWriteStream(path.join(__dirname, '../text-files/bill.pdf')));

    enterTitle(doc, titleName, date);
    writeItemsAndPrices(doc, itemPriceObject);
    base(doc, total, transaction_id);

}

var enterTitle = (doc, titleName, date)=>{
    doc.fontSize(defaultFontSize)
    .text('-------------------------------------------------',{
        align: 'center'
    })

    doc.fontSize(defaultFontSize).text(titleName,{
        align:'center'
    })

    doc.fontSize(defaultFontSize)
    .text('-------------------------------------------------\n\n\n',{
        align: 'center'
    })

    doc.fontSize(defaultFontSize).text(date, {
        align: 'left'
    })
}

var writeItemsAndPrices = (doc, itemPriceObject)=>{
/*
    itemPriceObject = {
        item: 'Item name',
        price: 10000
    }
*/
    console.log(itemPriceObject)
    for(var items of itemPriceObject){
        doc.fontSize(defaultFontSize).text(items.item, {
            align: 'left',
        })
        doc.fontSize(defaultFontSize).text(items.price, {
            align: 'right'
        })
        doc.text('--------------------\n\n')
        doc.lineGap(2)
    }

}

var base= (doc, total, transaction_id)=>{


    doc.fontSize(defaultFontSize).text('total: ', {
        align: 'left'
    });

    doc.fontSize(defaultFontSize).text(total, {
        align: 'right'
    });


    doc.fontSize(defaultFontSize)
    .text('\n\n-------------------------------------------------\n\n',{
        align: 'center'
    });

    doc.text(`transaction id: ${transaction_id}`, {
        align: 'center'
    });
    doc.fontSize(defaultFontSize).text('Thanks for shopping, Visit again!', {
        align: 'center'
    });

    doc.end();
}

// Test data
// var lst = [{
//         item: 'Mi iPhone 9xsuper ultra max',
//         price: 120000000
//     },
//     {
//         item: 'MI iPhone 99super max',
//         price: 2
//     }
// ]


// Test Call
// printPdf('MI Meow Meow Store', lst, 20000000, '20220202DLH0101')
// ... Test Successful
module.exports = {printPdf}