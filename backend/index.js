const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const { connection } = require("./database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { UserModel } = require("./models/usermodel");
const { BMIModel } = require("./models/BMIModel");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/signup", async (req, res) => {
  const { name, email, password, age, address, mobile } = req.body;

  const isUser = await UserModel.findOne({ email });
  if (isUser) {
    res.send({ msg: "User already exists, try logging in" });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      if (err) {
        res.send("Something went wrong, please try again later");
      }
      const new_user = new UserModel({
        name,
        email,
        password: hash,
        age,
        address,
        mobile,
      });
      try {
        await new_user.save();
        res.send({ msg: "Sign up successfull" });
      } catch (err) {
        res.send({ msg: "Something went wrong, please try again" });
      }
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  const hashed_password = user.password;
  const user_id = user._id;

  console.log(user);
  console.log(user_id);

  bcrypt.compare(password, hashed_password, function (err, result) {
    if (err) {
      res.send({ mes: "Somthing is went wrong" });
    }

    if (result) {
      const token = jwt.sign({ user_id }, process.env.SECRET_KEY);

      res.send({ message: "Login Successfully", token });
    } else {
      res.send({ mes: "Login Failed" });
    }
  });
});

// getProfile

app.get("/getProfile", async(req,res) => {

  const {user_id}=req.body;
const user=await UserModel.findOne({_id: user_id})
const {name,email}=user
res.send({name,email})

})

app.post("calculateBMI" ,async(req,res) => {
  const {height,weight,user_id} =req.body ;
  const height_in_metre=Number(height)*0.3048
  const BMI=Number(weight)/(height_in_metre)**2

  const new_bmi=new BMIModel({
    BMI,
    height:height_in_metre,
    weight,
    user_id
  })

  await new_bmi.save()
  res.send({BMI})


})

app.get("/getCalculation", async (req, res) => {
  const {user_id} = req.body;
  const all_bmi = await BMIModel.find({user_id : user_id})
  res.send({history : all_bmi})
})



app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to mongoDB");
  } catch {
    console.log("Failed to connect to mongoDB");
  }
  console.log("Listening on PORT 8080");
});


