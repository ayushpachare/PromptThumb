import { Request, Response } from "express"
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { error, log } from "console";

export const registerUser = async (req: Request, res: Response) => {
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()

        req.session.isLoggedin = true;
        req.session.userId = newUser._id;

        return res.json({
            message: 'Account created successfully',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (error: unknown) {
        console.log(error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message })
    }
}

// constroler for login user 
export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password } = req.body;

            if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }
        const isPasswordCorrect = await bcrypt.compare(password , user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:'Invalid email or password'})
        }

        req.session.isLoggedin = true;
        req.session.userId = user._id;

        return res.json({
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error: unknown) {
         console.log(error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message })
    }
}

// controllers for user logo 

export const logoutUser = async (req: Request , res: Response)=>{
    req.session.destroy((error: unknown)=>{
        if(error){
            console.log(error);
            const message = error instanceof Error ? error.message : 'Unknown error';
            return res.status(500).json({message})
        }
    })
    return res.json({message : 'logout successful'})
}

// controller for user verify 
export const verifyUser = async ( req : Request , res:Response)=>{
    try {
       const {userId} = req.session;
       const user = await User.findById(userId).select('-password')

       if(!user){
        return res.status(400).json({message:'Invalid User'})
       }
       return res.json({user})
    } catch (error: unknown) {
        console.log(error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({message})
    }
}