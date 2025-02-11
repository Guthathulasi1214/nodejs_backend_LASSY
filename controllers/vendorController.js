const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotEnv=require('dotenv');
dotEnv.config();
const secretKey=process.env.JWT_SECRET;
const VendorRegister=async(req,res)=>{
    const {username, email, password}=req.body;
    try {
        const VendorEmail=await Vendor.findOne({email});
        if(VendorEmail){
            return res.status(400).json("Email already taken");
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newVendor=new Vendor({
            username,
            email,
            password:hashedPassword
        });
        await newVendor.save();
        res.status(201).json({message:"vendor registered succesfully"});
        console.log('registered');
        
    } catch (error) {
        console.error(error);
        
        res.status(500).json({error:"Internal Server error"})
    }
}
const vendorLogin=async(req,res)=>{
    const {email, password}=req.body;
    try {
        const vendor=await Vendor.findOne({email});
        if(!vendor|| !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({ error: "invalud usernawm or password"})
        }
        const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"12h"})
        res.status(200).json({success: "login was succesfull",token});
        console.log("this is token",token);
        
    } catch (error) {
        console.log(email);
        console.log(password);
        console.error(error);
        
        
        
    }
}
const getAllvendors=async(req,res)=>{
    try {
         const vendors=await Vendor.find().populate('firm');
         res.json({vendors})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"});
        
    }
}
const getVendorById=async(req,res)=>{
    const vendorId=req.params.id;
    try {
       const vendor=await Vendor.findById(vendorId).populate('firm');
       if(!vendor){
        return res.status(404).json({message: "Vendor not found!!!"})
       } 
        res.status(200).json({vendor})
    } catch (error) {
        res.status(500).json({error: "internal server error"});

    }
}
module.exports = { VendorRegister, vendorLogin, getAllvendors, getVendorById};
