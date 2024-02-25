import bcrypt from 'bcryptjs'
import User from "../models/user.model.js"

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
export const login = () => {
    res.send('login page')
}
export const logout = () => {
    res.send('logout page')
}