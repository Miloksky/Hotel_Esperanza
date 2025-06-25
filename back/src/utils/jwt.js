const jwt = require("jsonwebtoken");

const createToken = (data) => {
   return jwt.sign(data,process.env.PASS_KEY,{expiresIn : "5h" });
}

const verifyToken = (token) =>{
   try {
       return data = jwt.verify(token,process.env.PASS_KEY);
    
   }catch (error) {
         console.log(error);
      }
}


module.exports =  {createToken, verifyToken}
