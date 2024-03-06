const expressAsyncHandler = require("express-async-handler");
const finanaceModel = require("../model/finanaceModel");

const getallfinancedata = expressAsyncHandler(async(req,res)=>{
    const getfinance = await finanaceModel.find();
    res.json(getfinance);
})