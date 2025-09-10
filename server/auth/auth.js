import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { user as userModel } from "../models/user.model"

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
            {expiresIn:"1d"})

            return res.status(200).json({
            success: true,
            message: "logged in",
            user: {
                id: foundUser._id,
                username: foundUser.username,
                email: foundUser.email,
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
            return res.status(409).json({
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
                email:newUser.email
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
        success:true

    })
}