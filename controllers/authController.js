const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt =  require("jsonwebtoken");
const admin = require("firebase-admin");

module.exports={
    // createUser: async  (req, res) =>{
    //     const user  = req.body;
    //     try {
    //         await admin.auth().getUserByEmail(user.email);
    //         return res.status(400).json({message: "User already exists"});
    //     } catch (error) {
    //         if(error.code === 'auth/user-not-found'){
    //             try {
    //                 const userResponse = await admin.auth().createUser({
    //                     email : user.email,
    //                     password: user.password,
    //                     emailVerified: false,
    //                     disabled: false,
    //                 });
    //                 console.log(userResponse.uid);

    //                 const newUser = new User({
    //                     uid: userResponse.uid,
    //                     username: user.username,
    //                     email: user.email,
    //                     password: CryptoJS.AES.encrypt(user.password , process.env.SECRET).toString(),
    //                     location: user.location,
    //                     isAgent: user.isAgent,
    //                 })
    //                 await newUser.save();
    //                 res.status(201).json({status:true});
    //             } catch (error) {
    //                 res.status(500).json({error: 'Error occurred trying to create account'});
    //             }
    //         }
    //     }
    // },
    createUser: async (req, res) => {
  const user = req.body;
  try {
    // Check if user already exists
    await admin.auth().getUserByEmail(user.email);
    return res.status(400).json({ message: "User already exists" });
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      try {
        // Create Firebase user
        const userResponse = await admin.auth().createUser({
          email: user.email,
          password: user.password,
          emailVerified: false,
          disabled: false,
        });
        console.log("Firebase UID:", userResponse.uid);

        // Save user in your DB
        const newUser = new User({
          uid: userResponse.uid,
          username: user.username,
          email: user.email,
          password: CryptoJS.AES.encrypt(user.password, process.env.SECRET).toString(),
          location: user.location,
          isAgent: user.isAgent,
        });

        await newUser.save();
        return res.status(201).json({ status: true });

      } catch (dbError) {
        console.error("DB error:", dbError);
        return res.status(500).json({ error: 'Error occurred trying to create account' });
      }
    } else {
      // 🔴 Catch ALL other errors here
      console.error("Firebase error:", error);
      return res.status(500).json({ error: 'Error checking user' });
    }
  }
},


    //Login
    loginUser:  async (req, res) => {
        try {
            
            // const user = await User.findOne({email: req.body.email});
            //  //create JWT Token
             

            // !user && res.status(401).json("Wrong Login Details");

            // const decryptedpass = CryptoJS.AES.decrypt(user.password , process.env.SECRET);
            // const depassword = decryptedpass.toString(CryptoJS.enc.Utf8);

            // // depassword !== req.body.password && res.status(401).json("Wrong Password");
            // depassword !== req.body.password && res.status(401).json("Wrong Password");
            // const{password , _v , createdAt , ...others} = user._doc;

            // const userToken = jwt.sign({
            //     id: user._id , isAdmin: user.isAdmin , isAgent: user.isAgent
            // }, process.env.JWT_SEC, {expiresIn: "21d"} )

            // res.status(200).json({...others ,userToken});
            const user = await User.findOne({email: req.body.email},
                {_v: 0, createdAt: 0, updatedAt: 0 , skills: 0, email: 0}
            );
            if(!user){
                return res.status(400).json({
                    message: "User not found"
                });
            }
            const decryptedPass = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const depassword = decryptedPass.toString(CryptoJS.enc.Utf8);
            if(depassword !== req.body.password){
                return res.status(400).json({
                    message: "Wrong Password"
                });
            }
            const userToken = jwt.sign({
                id: user._id, isAdmin: user.isAdmin, isAgent: user.isAgent , uid: user.uid
            }, process.env.JWT_SEC, {expiresIn: "21d"});

            const {password , isAdmin, ...others} = user._doc;
            res.status(200).json({...others, userToken});
        } catch (error) {
            res.status(500).json({
                error: 'Error occurred trying to login'});
        }
    }
} 