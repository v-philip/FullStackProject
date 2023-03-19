const router = require(`express`).Router()
var createError = require('http-errors')

const productsModel = require(`../models/products`)
const mongoose = require(`mongoose`)

const jwt = require('jsonwebtoken')
const https = require('https');




module.exports = router