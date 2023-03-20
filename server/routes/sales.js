const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const carsModel = require(`../models/cars`)
const products = require("../models/products")
const cart = require("../models/cart")


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
    console.log(req.params.orderId)


    console.log(productDetails)
    salesModel.findOneAndUpdate({paypalPaymentID:req.params.orderId},{products:[productDetails]},(err,data) =>
    {
        if(err)
        {
            return next(err)
        }
        else{
            console.log(data)
        }
        
    })
    
    cart.findOneAndUpdate({user:req.params.id},{product:null},(err,data) =>
    {
        if(err)
        {
            return next(err)
        }
        else
            console.log(data)
            
    }
    )

}


// Save a record of each Paypal payment
router.post('/sales/:orderID/:price/:id', createNewSaleDocument)
router.put('/sales/:id/:quantity/:orderId', addProdcutDetails)


module.exports = router