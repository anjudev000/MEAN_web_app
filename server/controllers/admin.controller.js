
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
//const passport = require('passport');


const Admin = mongoose.model('Admin');
const User = mongoose.model('User');
const _ = require('lodash');


const adminLogin = async(req,res)=>{
  const {email,password} = req.body;
  try{
    const adminDetails = await Admin.findOne({email,password});
    console.log(adminDetails);
    if(!adminDetails) return res.status(401).json({message:"Invalid credentials"});
    const token = jwt.sign({adminId:adminDetails._id},"SECRETISTHISSTRING",  {expiresIn: process.env.JWT_EXP});
    return res.status(200).json({token});
  }
  catch(error){
    res.status(500).json({error});
  }
}
const adminProfile = async(req,res,next)=>{
try{
const admin = await Admin.findOne({_id: req._id })
if (!admin) {
  return res.status(404).json({ status: false, message: 'Not found' });
} else {
  return res.status(200).json({
    status: true,
    user: _.pick(admin, ['email']),
    
  })  
}
}
catch(err){
  return next(err);
}
}

const userList = async(req,res)=>{
  try{
    const userData = await User.find();
    if(userData) return res.status(200).json({userData});
    else return res.status(404).json({ status: false, message: 'Not found' });
  }
  catch(error){
    res.status(500).json({error:error.message });
  }
}
const addUser = async(req,res,next)=>{
  try{
    console.log(req.body.fullName, req.body.email, req.body.password);
    console.log("heelllooooooooooo addd");
    const user = new User();
    user.fullName = req.body.fullName;
    console.log(user.fullName);
    user.email = req.body.email;
    user.password = req.body.password;
    // user.profilePic = req.file.path;
    // console.log("hjkjhjkjk",user.profilePic);
    const savedUser = await user.save();
    console.log(savedUser);
    res.send(savedUser);
  }
  catch(err){
    if (err.code === 11000) {
      res.status(422).send(['Duplicate email address found.']);
    } else {
      next(err);
    }
  }
}

const editUser = async(req,res)=>{
  try{
    console.log("hiii");
    const {id}= req.params;
   const userDetails = await User.findByIdAndUpdate(
    {_id:id},
    {$set:{fullName:req.body.fullName,email:req.body.email}}
   );
   console.log(userDetails);
   return res.status(200).json({userDetails});

  }
  catch(error){
    res.status(500).json({error:error.message})
  }
}
const deleteUser = async(req,res)=>{
  try{
    console.log("goooodd");
     const {id}= req.params;
   await User.deleteOne({ _id : id});
   res.status(200).json({message:"user deleted"});
    }
  catch(err){
    res.status(500).json({err:err.message})

  }
}

const blockUnblock = async(req,res)=>{
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
  try{
    console.log("hiiiiiiiiiiiii");
    const {id} = req.params;
    console.log(id);
    const user = await User.findById(id);
    console.log("fffffffffffffff",user);
    if(user.isblock){
      user.isblock = false;
    }else{
      user.isblock = true;
    }
    const updatedUser = await user.save();
    console.log(updatedUser);
    return res.status(200).json({updatedUser});
 }
  catch(error){
    res.status(500).json({error:error.message})
  }
}


module.exports = {
  adminLogin,
  adminProfile,
  userList,
  addUser,
  deleteUser,
  blockUnblock,
  editUser 
}