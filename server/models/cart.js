const mongoose = require(`mongoose`)
let itemSchema = new mongoose.Schema(
    {
        productId:
        {
            type:String ,required:true
        },
        quantity: {type:Number,default:0}
    }
)

let cartSchema = new mongoose.Schema(
   {
        product:
        [itemSchema],

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: `users`
        }
   },
   {
       collection: `cart`
   })

module.exports = mongoose.model(`cart`, cartSchema)