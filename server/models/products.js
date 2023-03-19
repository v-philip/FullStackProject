const mongoose = require(`mongoose`)

let productsSchema = new mongoose.Schema(
   {

    title: {type: String},
    description: {type: String},
    price: {type: Number},
    discountPercentage: {type: Number},
    rating: {type: Number},
    stock:{type: Number},
    brand: {type: String},
    category: {type: String},
    thumbnail: {type: String},
    images: [{type: String}],
        
   },
   {
       collection: `products`
   })

module.exports = mongoose.model(`products`, productsSchema)