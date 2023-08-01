const jwt=require('jsonwebtoken');


// module.exports.verifyJwtToken = (req,res,next)=>{
// let token;  //token send from the client side application is stored here 
// if('authorization' in req.headers){
//   token=req.headers['authorization'].split(' ')[1];
//   if(!token) 
//   return res.status(403).send({auth:false,message: 'No token provided'});
//   else {
//     jwt.verify(token,process.env.JWT_SECRET),
//     (err,decoded) => {
//       if(err)
//       return res.status(500).send({auth:false,message:'Token authentication failed'});
//       else{
//         req._id = decoded._id;
//         next();
//       }
//     }

//   }
// }
// }


//for users


module.exports.verifyJwtToken = async (req, res, next) => {
  let token; // Token sent from the client-side application is stored here
  console.log("helllooooooooo  please helppp");
  if ('authorization' in req.headers) {
    token = req.headers['authorization'].split(' ')[1];
    console.log("i willlllllllllllllllllllll",token);

    if (!token) {
      return res.status(403).send({ auth: false, message: 'No token provided' });
    } else {
      try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req._id = decoded._id;
        next();
      } catch (err) {
        return res.status(500).send({ auth: false, message: 'Token authentication failed' });
      }
    }
  }
};

// for admin

module.exports.verifyAdminJwtToken = async (req, res, next) => {
  let token; // Token sent from the client-side application is stored here

  if ('authorization' in req.headers) {
    token = req.headers['authorization'].split(' ')[1];
    console.log("hellllooooooooooooooooooooooooooooo",token);
    if (!token) {
      return res.status(403).send({ auth: false, message: 'No token provided' });
    } else {
      try {
        const decoded = await jwt.verify(token,"SECRETISTHISSTRING");
        req._id = decoded.adminId;
        console.log(decoded,"and",req._id);
        next();
      } catch (err) {
        return res.status(500).send({ auth: false, message: 'Token authentication failed' });
      }
    }
  }
};

