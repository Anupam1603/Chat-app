//openssl rand -base64 32

import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId , res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"15d",
    })

    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000, //miliseconds format,
        httpOnly:true, // to prevent XSS attacks cross-site scripting attacks
        sameSite:"strict" , //csrf attacks cross site req forgery attacks
        secure:process.env.NODE_ENV !== "development",
    })
}


export default generateTokenAndSetCookie;
