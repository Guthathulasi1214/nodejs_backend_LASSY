const express = require('express')
const dotEnv=require('dotenv');
const mongoose=require('mongoose');
const vendorRoutes=require('./routes/vendorRoutes.js');
const bodyParser=require('body-parser');
const firmRoutes=require('./routes/firmRoutes.js');
const productRoutes=require('./routes/productRoutes.js');
const cors=require('cors');
const path=require('path')
const app = express()
app.use(cors())
const port = process.env.PORT || 3000;
dotEnv.config()
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected succesfully"))
.catch((error)=>console.log(error));
app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use('/',(req,res)=>{
    res.send("<h1>WEOLCOME TO LASSY</h1>")
})