const router = require(`express`).Router()
const productsModel = require(`../models/products`)
const jwt = require('jsonwebtoken')
const https = require('https');




module.exports = router