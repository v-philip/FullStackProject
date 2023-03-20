const router = require(`express`).Router()

var createError = require('http-errors')
const Cart = require(`../models/cart`)

const jwt = require('jsonwebtoken')
const mongoose = require(`mongoose`)

const User = require(`../models/users`)
const products = require(`../models/products`)
const { isValidObjectId } = require('mongoose')

const addItemToCart = async(req, res, next) => {
    
    let userI  = req.params.user;
    console.log(userI);
    var userId = mongoose.Types.ObjectId(userI);
     let user = await User.exists({id:userId});
    
    var productID = req.params.product;
    console.log(productID);
    console.log(productID);
    console.log(typeof productID);

    let flag = await Cart.exists({user:userId});
    console.log(flag);
    
    if(!flag)
    {
        let productItem = new Object()
        productItem.productId = productID;
        productItem.quantity = 1;
        console.log(productItem);
        Cart.create({product:[productItem],user:userId},(err,data)=>{
            if(err){
            console.log("hello");
            return next(err);
        }
            else
            console.log("test");
            return res.json(data)
            
        })
    }
    else
    {
      let cart = await Cart.findOne({user:userId});
        let itemIndex = cart.product.findIndex((p) => p.productId == productID);
        console.log(itemIndex);
        if(itemIndex>-1)
        {
            let productItem = cart.product[itemIndex];
            productItem.quantity += 1;
            cart.product[itemIndex] = productItem;
            cart.save();
            return res.json(cart);
        }
        else
        { 

            let productItem = new Object()
            productItem.productId = productID;
            productItem.quantity = 1;
            console.log(productItem);
            cart.product.push(productItem);
            cart.save();
            return res.json(cart);
        }
    }
 }; 

const removeItem = async (req, res) => {
    let userId = req.params.userId;
    let user = await User.exists({ _id: userId });
    let productId = req.params.productId;

    Cart.findOne({ userId: userId }, (err, data) => {
      if (err) return next(err);
      else {
        Cart.updateOne(
          { userId: userId },
          { $pull: { products: { productId: productId } } },
          (err, data) => {
            if (err) return next(err);
            else {
              return res.json(data);
            }
          }
        );
      }
    });
  };

  
  //   let cart = await Cart.findOne({ userId: userId });
  //   if (!cart)
  //     return res
  //       .status(404)
  //       .send({ status: false, message: "Cart not found for this user" });
  
  //   let itemIndex = cart.products.findIndex((p) => p.productId == productId);
  //   if (itemIndex > -1) {
  //     cart.products.splice(itemIndex, 1);
  //     cart = await cart.save();
  //     return res.status(200).send({ status: true, updatedCart: cart });
  //   }
  //   res
  //     .status(400)
  //     .send({ status: false, message: "Item does not exist in cart" });
  // };

const getCart = async (req, res) => {
    let userI = req.params.user;
    var userId = mongoose.Types.ObjectId(userI);

    var flag = await Cart.exists({user:userId});
    console.log(flag);

    if(flag)
    {
      Cart.findOne({user:userId},(err,data)=>{
        if(err)
        return next(err);
        else{
          console.log(data);
          // var temp= {datas:data, prodDetails:[]};
          // var items = temp.datas.product;
          // var temp2;
          // for(var i=0;i<items.length;i++)
          // {
          //   console.log("11");
          //   temp2 = products.findById(items[i].productId,(err,data)=>{res.json(data)});
          //   // carsModel.findById(req.params.id, (error, data) => 
          //   // {
          //   //     res.json(data)
          //   // })
          //   temp.prodDetails.push(temp2);
            
          // }
        // console.log(temp);
        return res.json(data);
        
      }
      })
    }
    else
    {
      return res.json("Cart is empty");
    }
  };




    // let user = await User.exists({ _id: userId });
  
    // if (!userId || !isValidObjectId(userId) || !user)
    //   return res.status(400).send({ status: false, message: "Invalid user ID" });
  
    // let cart = await Cart.findOne({ userId: userId });
    // if (!cart)
    //   return res
    //     .status(404)
    //     .send({ status: false, message: "Cart not found for this user" });
  
    // res.status(200).send({ status: true, cart: cart });
  

  const decreaseQuantity = async (req, res) => {
    // use add product endpoint for increase quantity
    let userId = req.params.userId;
    let user = await User.exists({ _id: userId });
    let productId = req.body.productId;
  
    if (!userId || !isValidObjectId(userId) || !user)
      return res.status(400).send({ status: false, message: "Invalid user ID" });
  
    let cart = await Cart.findOne({ userId: userId });
    if (!cart)
      return res
        .status(404)
        .send({ status: false, message: "Cart not found for this user" });
  
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);
  
    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      productItem.quantity -= 1;
      cart.products[itemIndex] = productItem;
      cart = await cart.save();
      return res.status(200).send({ status: true, updatedCart: cart });
    }
    res
      .status(400)
      .send({ status: false, message: "Item does not exist in cart" });
  };
  
  
  router.post("/cart/:user/:product", addItemToCart);
  router.get("/cart/:user", getCart);
  router.patch("/cart/:userId", decreaseQuantity);
  router.delete("/cart/delete/:userId/:productId", removeItem);

  module.exports = router;