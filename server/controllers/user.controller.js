
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const User = mongoose.model('User');

module.exports.register = async (req, res, next) => {
  try {
    console.log(req.body.fullName, req.body.email, req.body.password);
    
    const user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.profilePic = req.file.path;

    const savedUser = await user.save(); // Using await to handle the asynchronous operation
    console.log(savedUser);
    res.send(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(422).send(['Duplicate email address found.']);
    } else {
      next(error);
    }
  }
};



module.exports.login = (req, res) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => { 
        // error from passport middleware
        if (err){
          return res.status(400).json(err);
        }
        // registered user
        else if (user) {
          return res.status(200).json({"token": user.generateJwt() });
        }
        // unknown user or wrong password
        else{
          return res.status(404).json(info);
        } 
    })(req, res);
}
module.exports.userProfile = async (req, res, next) => {
  try {
    console.log("yaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    const user = await User.findOne({ _id: req._id });
    console.log(user.profilePic);

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    } else {
      return res.status(200).json({
        status: true,
        user: _.pick(user, ['fullName', 'email','profilePic']),
        
      })  
     
    }
  } catch (err) {
    return next(err);
  }
};




