const express = require('express');
const mongoose =require('mongoose');
const cors=require("cors");

// const ManufactureModel= require('./models/Mongodb');
const ManufactureModel= require('./models/Mangodb.js');

const ProductModel = require('./models/product.js');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post('/login',(req,res)=>{
  const {username,password}=req.body;
  ManufactureModel.findOne({username:username})
  .then(user=>{
    if(user){
      if(user.password==password){
      res.json("success");
      }
    else{
      res.json("the password is incorrect");
    }
  }else{
    res.json("No record existed");
  }
  })
})

app.post('/register',(req,res)=>{
    ManufactureModel.create(req.body)
    .then(employees=>res.json(employees))
    .catch(err => res.json(err));
})

app.post('/addproduct', (req, res) => {
  ProductModel.create(req.body)
    .then(product => res.json(product))
    .catch(err => res.status(500).json(err));
});

app.post('/Signin', async (req, res) => {
  const { username, password } = req.body;
  try {
      const user = await ManufactureModel.findOne({ username: username });
      if (user) {
          if (user.password === password) {
              const products = await ProductModel.find({ manufactureId: username });
              res.json({ success: true, manufacture: user, products: products });
          } else {
              res.json({ success: false, message: "The password is incorrect" });
          }
      } else {
          res.json({ success: false, message: "No record found" });
      }
  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(3001,()=>{
    console.log("server is running");
})