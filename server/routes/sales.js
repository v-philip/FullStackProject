const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const carsModel = require(`../models/cars`)
const products = require("../models/products")


const createNewSaleDocument = (req, res, next) => 
{           
    // Use the PayPal details to create a new sale document                
    let saleDetails = new Object()
    let products = new Object()     
    saleDetails.paypalPaymentID = req.params.orderID
   
    saleDetails.total = req.params.price
     
    console.log(saleDetails)
    console.log(products)

    
    salesModel.create(saleDetails, (err, data) => 
    {
        if(err)
        {
            return next(err)
            
        }                        
    })   
    
    return res.json({success:true})
}


// Save a record of each Paypal payment
router.post('/sales/:orderID/:price', createNewSaleDocument)


module.exports = router