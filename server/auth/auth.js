import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { user as userModel } from "../models/user.model.js"

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if(!username || !password) {
           return res.status(401).json({
                 message:"Invalid username or password",
                 success:false
             })
        }

        const foundUser = await userModel.findOne({ "username": username })
        if(!foundUser) {
           return res.status(401).json({
                message:"User not found",
                success:false
            })
        }

      const isPassword =await bcrypt.compare(password, foundUser.password)
        if(!isPassword) {
            return res.status(401).json({
                message:"Invalid username or password",
                success:false
            })
        }

        const token = jwt.sign(
            {"username":foundUser.username,"id":foundUser._id},
            "sdjfosdjgoaij",
            {expiresIn:"10d"})

            return res.status(200).cookie("token",token).json({
            success: true,
            message: "logged in",
            user: {
                id: foundUser._id,
                username: foundUser.username,
                email: foundUser.email,
                token: token
            },
            token  
        });

        
    } catch (error) {
        console.log(error)
        
    } finally {
        console.log(
            "Done"
        )
    }
}


export const register=async (req,res)=>{
    try {
        const {email,username,password}=req.body
        if(!email || !password || !username){
            return res.status(401).json({
                message:"Invalid user credentials",
                success:false
            })
        }
        const existinguser=await userModel.findOne({email})
        if(existinguser){
            return res.status(401).json({
                message:"User already exsist",
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser= await userModel.create({
            username,
            email,
            password:hashedPassword
        });
        return res.status(201).json({
            message:"User Registered successfully ",
            success:true,
            user:{
                id:newUser._id,
                username:newUser.username,
                email:newUser.email,
                token: token
            }
        })

    } catch (error) {
        console.log(error);
        
    }finally{
        console.log("completed");
        
    }
}

export const logout= async(req,res)=>{
    return res.status(200).cookie("token","",{expires:new Date(Date.now()),httpOnly:true}).json({
        message:"User logged out successfully",
        success:true,
        token: ""
    })
}

export const isAuthenticated = (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        return res.status(401).json({ message: "No token provided", success: false });
      }
  
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Invalid token format", success: false });
      }
  
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token", success: false });
        }
  
        // Attach decoded user to req
        req.user = {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
        };
  
        next();
      });
    } catch (error) {
      console.error("ERROR (isAuthenticated):", error);
      return res.status(500).json({
        error,
        success: false,
        message: "Internal server error",
      });
    }
  };