const Product = require('../models/product');
const multer=require('multer');
const Firm=require('../models/Firm')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Files will be saved in 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage});
const addProduct=async(req,res)=>{
    try {
        const {productName,price,category,bestSeller,description}=req.body;
        const image=req.file?req.file.filename:undefined;
        const  firmIdd=req.params.firmId;
        const firm=await Firm.findById(firmIdd);
        if(!firm){
            return res.status(404).json({error:"No firm found"});
        }
        const product=new Product({
            productName,price,category,bestSeller,image,firm:firm._id
        })
        const savedProduct=await product.save();
        firm.product.push(savedProduct);
        await firm.save()   
         res.status(200).json({message:"SavedProduct"})
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal server error"})
        
    }
}
const getProductByFirm=async(req,res)=>{
    try {
        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"no firm found"})            
        }
        const resName=firm.firmName;

        const products=await Product.find({firm:firmId})
        res.status(200).json({resName,products});
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal server error"})   
    }
}
module.exports={addProduct,getProductByFirm}