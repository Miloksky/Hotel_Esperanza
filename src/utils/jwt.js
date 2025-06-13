const jwt = require("jsonwebtoken");

const createToken = (data) => {
   return jwt.sign(data,process.env.PASS_KEY,{expiresIn : "2h" });
}



module.exports =  {createToken}