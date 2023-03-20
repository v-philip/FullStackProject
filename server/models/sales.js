const mongoose = require(`mongoose`)

let prodcuts = new mongoose.Schema(
    {
        prodcut: {type: String, required:true},
        quant: {type: Number, required:true}
    },
)


let salesSchema = new mongoose.Schema(
   {
        paypalPaymentID: {type: String, required:true},
        prodcuts: [prodcuts],
        total: {type: Number, required:true}
   },
   {
       collection: `sales`
   })

module.exports = mongoose.model(`sales`, salesSchema)