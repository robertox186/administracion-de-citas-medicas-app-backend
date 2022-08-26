const jwt=require('jsonwebtoken');


module.exports.VerifyToken=async function(req,res,next){
    const {token}=req.body;
    if(!token){
         res.status(401).send({message:"no token provided"})
    }
try {
let decode= await jwt.verify(token,'secretKey')
req.userId=decode;
    console.log(decode)
    next();

    } catch(err){

        res.json({status:401})
    }
       
}
module.exports.isAdmin=async (req,res,next)=>{
    
   const {token}=req.body;
   if(!token){
    return res.status(401).send({message:"no token provided"})
}

const decode=await jwt.verify(token,'secretKey');
req.userId=decode;
console.log(decode)
if(decode.admin){
next();
}
else{
    res.json({status:300,message:"no tiene autorizacion"})
}
}