const User  = require("../models/User")
const jwt =  require("jsonwebtoken");

const verifyToken = (req , res , next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token , process.env.JWT_SEC , async (err , user) => {
            if (err) res.status(403).json('Invalid Token')
                req.user = user;
            console.log(user)
            next();
        })
    }else{
        return res.status(401).json("You're Not Authenticated")
    }
};

const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id){
            next();
        }else{
            res.status(403).json("You Are Restricted From Performing This Operation")
        }
    }) 
};
const verifyAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You Are Restricted From Performing This Operation")
        }
    })
} 


module.exports = { verifyToken , verifyAndAuthorization , verifyAndAdmin }