const mongoose = require(`mongoose`)

let prodcuts = new mongoose.Schema(
    {
        productID: {type: String, required:true},
        quantityuant: {type: Number, required:true}
    },
)


let salesSchema = new mongoose.Schema(
   {
        paypalPaymentID: {type: String, required:true},
        prodcuts: [prodcuts],
        total: {type: Number, required:true},
        user: { type: String, required:true }
   },
   {
       collection: `sales`
   })

module.exports = mongoose.model(`sales`, salesSchema)