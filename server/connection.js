const mongoose=require('mongoose')
require('dotenv').config();
const MongoUrl = process.env.MongoUrl;

const connected=mongoose.connect(MongoUrl)

module.exports={connected}