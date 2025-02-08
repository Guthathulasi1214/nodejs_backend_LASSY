const express=require('express');
const firmController=require('../controllers/firmController');
const verifyToken=require('../middlewares/verifyToken');
const router=express.Router();
console.log("firmcontroller",firmController);

router.post('/add-firm',verifyToken,firmController.addFirm);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    req.headers('Content-Type','image/jpg');
    res.sendFile(Path.join(__dirname,'..','uploads',imageName))
})
router.delete('/:firmId',firmController.deleteFirmById);
module.exports=router

