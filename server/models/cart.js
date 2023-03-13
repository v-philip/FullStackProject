const mongoose = require(`mongoose`)

let carsSchema = new mongoose.Schema(
   {
        user: {type: String},
        email: {type: String},
        item:[]

   },
   {
       collection: `cars`
   })

module.exports = mongoose.model(`cars`, carsSchema)