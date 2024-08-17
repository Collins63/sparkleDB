const User  = require("../models/User");
const CryptoJS  = require("crypto-js");

module.exports = {
    updateUser: async (req, res) =>{
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password , process.env.SECRET).toString();
        }
        try {
            const UpdateUser = await User.findByIdAndUpdate(
                req.params.id , {
                    $set: req.body
                }, {new: true}
            );

            const {password , _v , createdAt, ...others}  = this.updateUser._doc;
            res.status(200).json({...others});
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //delete user
    deleteUser: async (req , res) =>{
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account Successfully Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //getUser
    getUser: async(req, res) =>{
        const userId = req.params.id;
        
        try {
            const user = await User.findById({_id:userId} ,{createdAt:0 , _V:0});
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //get all users
    getAllUsers: async(req, res) =>{
        try {
            const allUsers = await User.find();
            res.status(200).json(allUsers)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}