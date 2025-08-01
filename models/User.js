const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        uid:{type: String , required: true , unique:true},
        username:{type: String , required: true , unique:true},
        email:{type: String , required: true , unique:true},
        password:{type: String , required: true},
        location:{type: String , required: true },
        isAdmin:{type: Boolean , default:false},
        isAgent:{type: Boolean , default:false},
        disabled:{type: Boolean , default:false},
        emailVerified:{type: Boolean , default:false},
        phoneNumber:{type: String , default:""},
        skills:{type: Array , default:false },
        profile:{
            type: String,
            required: true,
            default:"https://img.icons8.com/officel/80/user.png",
        }
    },{timestamps:true}
);  

module.exports = mongoose.model("User" , UserSchema)