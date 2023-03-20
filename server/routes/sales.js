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
    saleDetails.user = req.params.id
     
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


const addProdcutDetails = (req, res, next) =>
{
    let productDetails = new Object()
    productDetails.productID = req.params.id
    productDetails.quantity = req.params.quantity


    console.log(productDetails)
    salesModel.findOneAndUpdate({paypalPaymentID:req.params.orderID},{$push:{products:productDetails}},(err,data) =>
    {
        if(err)
        {
            return next(err)
        }
        else
        {
            return res.json(data)
        }
    })
}


// Save a record of each Paypal payment
router.post('/sales/:orderID/:price/:id', createNewSaleDocument)
router.put('/sales/:id/:quantity/:orderId', addProdcutDetails)


module.exports = router