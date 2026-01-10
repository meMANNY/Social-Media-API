const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{

    const authHeader = req.headers.token;
    if(!authHeader){

        return res.status(401).json("You are not authenticated!");
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(403).json("Token is not valid!");
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(403).json("Token expired!");
    }
};

module.exports = verifyToken;