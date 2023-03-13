const router = require(`express`).Router()
var createError = require('http-errors')

const productsModel = require(`../models/products`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY, 'utf8')

const multer  = require('multer')
var upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})


const verifyUsersJWTPassword = (req, res, next) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            return next(err)
        }

        req.decodedToken = decodedToken
        return next()
    })
}


const checkThatUserIsAnAdministrator = (req, res, next) =>
{
    if(req.decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
    {    
        return next()
    }
    else
    {
        return next(createError(401))
    }
}


// const createNewProductDocument = (req, res, next) => 
// {           
//     // Use the new car details to create a new car document                
//     let productDetails = new Object()
                
//     productDetails.title = req.body.title
//     productDetails.desription = req.body.desription
//     productDetails.price = req.body.price
//     productDetails.discountPercentage = req.body.discountPercentage
//     productDetails.rating = req.body.rating
//     productDetails.stock= req.body.stock
//     productDetails.brand = req.body.brand
//     productDetails.category = req.body.category
//     productDetails.thumbnail = req.body.category
//     productDetails.brand = req.body.brand

//     // add the car's photos to the carDetails JSON object
//     carDetails.photos = []
                
//     req.files.map((file, index) =>
//     {
//         carDetails.photos[index] = {filename:`${file.filename}`}
//     })
        
//     productsModel.create(carDetails, (err, data) => 
//     {
//         if(err)
//         {
//             return next(err)
//         }
        
//         return res.json(data)        
//     })
// }


const getAllProductDocuments = (req, res, next) => 
{   
    
    //user does not have to be logged in to see car details
    productsModel.find((err, data) => 
    {       
        if(err)
        {
            return next(err)
        }     
        return res.json(data)
    })
}


const getProdcutPhotoAsBase64 = (req, res, next) => 
{   
    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, 'base64', (err, fileData) => 
    {     
        if(err)
        {
            return next(err)
        }  
        
        if(fileData)
        {  
            return res.json({image:fileData})                           
        }   
        else
        {
            return res.json({image:null})
        }
    })             
}


// const getProdcutDocument = (req, res, next) => 
// {
//     productsModel.findById(req.param.id, (err, data) => 
//     {
//         if(err)
//         {
//             return next(err)
//         }  
//         console.log(data) 
//         return res.json(data)
//     })
// }

//make a good route to get one product
const getProdcutDocument = (req, res, next) =>
{
    productsModel.findById(req.params.id, (err, data) =>
    {
        if(err)
        {
            return next(err)
        }
        console.log(data)
        return res.json(data)
    })
}




const updateProductDocument = (req, res, next) => 
{
    productsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })        
}


const deleteProdcutDocument = (req, res, next) => 
{
    productsModel.findByIdAndRemove(req.params.id, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })      
}


// read all records
router.get(`/products`, getAllProductDocuments)

// get one car photo
// router.get(`/products/photo/:filename`, getCarPhotoAsBase64)

// Read one record
router.get(`/products/:id`, getProdcutDocument)
// router.get(`/products/:id`,  getProdcutDocument)

// Add new record
// router.post(`/products`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, upload.array("carPhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), createNewProductDocument)

// Update one record
router.put(`/products/:id`, verifyUsersJWTPassword, updateProductDocument)

// Delete one record
router.delete(`/products/:id`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, deleteProdcutDocument)


module.exports = router