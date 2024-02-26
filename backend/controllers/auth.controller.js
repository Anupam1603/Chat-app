import bcrypt from 'bcryptjs'
import User from "../models/user.model.js"
import generateTokenAndSetCookie from '../utils/generateToken.js'

//profile pic api : https://avatar-placeholder.iran.liara.run/


export const signup =async (req,res) => {
   try {
     //frontend se data utha le
   const {fullName, username,password, confirmPassword, gender} = req.body
   
   //bhai check krle password sahi ya galat
   if(password !== confirmPassword) {
    res.status(400).json({error: "Passwords dont match "})
   }

   const user  = await User.findOne({username});

   if(user) {
    return res.status(400).json({error:" Username Already exists!!"});

   }
   //Hash the password here
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password,salt);

   const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
   const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
   
   const newUser = new User ({
    fullName,
    username,
    password:hashedPassword,
    gender,
    profilePic: gender === "male" ? boyProfilePic:girlProfilePic
   });

   if(newUser){
    //Generate JWT Token here
    generateTokenAndSetCookie(newUser._id, res);
   await newUser.save()

   res.status(201).json({
    _id:newUser._id,
    fullName:newUser.fullName,
    username:newUser.username,
    profilePic:newUser.profilePic
   })
  } else {
    res.status(400).json({error:"Invalid User data"})
  }

   } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({error:"Internal server error"})
   }
}

export const login = async (req,res) => {

    try {
      //take input from frntend
      const {username, password} = req.body;
      //search the user
      const user = await User.findOne({username});
      const isPasswordCorrect = await bcrypt.compare(password,user?.password || "" );

      if(!user || !isPasswordCorrect)
      return res.status(400).json({error:"Invaid username or password"})

      generateTokenAndSetCookie(user._id,res);

      res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        username:user.username,
        profilePic:user.profilePic,

      })


    } catch (error) {

      console.log("Error in login controller", error.message);
      res.status(500).json({error:"Internal server error"})
    }
}
export const logout =async (req,res) => {

    try {
       res.cookie("jwt", {maxAge:0})
       res.status(200).json({message: "User logged out sucessfully"})
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({error:"Internal server error"})
    }
}