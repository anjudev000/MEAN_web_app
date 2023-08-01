const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path =require("path");
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
  cloud_name: "dcgrqxvbk",
  api_key: '241596312989648',
  api_secret: '5ktcJh7n9t-vBuk84YSzBnQg-vs'
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'png'], 
    transformation: [{ width: 200, height: 200, crop: 'limit' }]
  },
});

const upload = multer({ storage: storage });

// Serve static files
router.use('/public/userImages', express.static(path.join(__dirname, '../public/userImages')));



router.post('/register',upload.single('profilePic'),userController.register);
router.post('/authenticate',userController.login);
router.get('/usserprofile',jwtHelper.verifyJwtToken,userController.userProfile);

module.exports = router;