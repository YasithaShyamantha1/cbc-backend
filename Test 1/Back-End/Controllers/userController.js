import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config()
export function createUser(req, res) {
    const newUserData = req.body;

    if(newUserData.type == "admin"){
        if(req.user==null){
            res.json({
                message: "please login as administrator to create admin accounts"
            })
            return;
        }
        if(req.user.type != "admin"){
            res.json({
                message:"please login as administrator to create admin accounts"
            })
            return;
        }
    }

    // Hash password before saving
    newUserData.password = bcrypt.hashSync(newUserData.password, 10);

    const user = new User(newUserData);  // Use newUserData to avoid unwanted data

    user.save().then(() => {
        res.json({
            message: "User Created",
        });
    }).catch(() => {
        res.json({
            message: "User Not Created",
        });
    });
}

export function loginUser(req, res) {
    // Use findOne for optimized query to find a user
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res.json({
                message: "User not found",
            });
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (isPasswordCorrect) {
            const token = jwt.sign({
                email: user.email,
                firstName: user.firstName,
                isBlocked: user.isBlocked,
                type: user.type,
                profilePicture: user.profilePicture,
            }, process.env.SECRET);

            res.json({
                message: "User logged in",
                token: token,
                user: {
                    firstName:user.firstName,
                    type:user.type,
                    profilePicture: user.profilePicture,
                    email : user.email
                    
                }
            });
        } else {
            res.json({
                message: "Invalid password",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    });
}

export function isAdmin(req){
    if(req.user==null){
        return false;
    }

    if(req.user.type != "admin"){
        return false;
    }

    return true
}

export function isCustomer(req){
    if(req.user==null){
        return false;
    }

    if(req.user.type != "user"){
        return false;
    }

    return true
}
export async function googleLogin(req, res) {
    const googleToken = req.body.token;
  
    try {
      const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleToken}`,
        },
      });
  
      const { email, given_name, family_name, picture } = response.data;
  
      if (!email) {
        return res.status(400).json({
          message: "Invalid Google token",
        });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email: email });
  
      if (existingUser) {
        const jwtToken = jwt.sign(
          {
            email: existingUser.email,
            firstName: existingUser.firstName,
            type: existingUser.type,
            profilePicture: existingUser.profilePicture,
          },
          process.env.SECRET,
          { expiresIn: "1d" }
        );
  
        return res.status(200).json({
          message: "User logged in",
          token: jwtToken,
          user: {
            firstName: existingUser.firstName,
            type: existingUser.type,
            profilePicture: existingUser.profilePicture,
            email: existingUser.email,
          },
        });
      }
  
      // Create new user if not found
      const newUser = new User({
        email: email,
        firstName: given_name,
        lastName: family_name,
        type: "user", // Default user type
        password: bcrypt.hashSync("defaultPassword", 10), // Temporary password
        profilePicture: picture,
      });
  
      await newUser.save();
  
      const jwtToken = jwt.sign(
        {
          email: newUser.email,
          firstName: newUser.firstName,
          type: newUser.type,
          profilePicture: newUser.profilePicture,
        },
        process.env.SECRET,
        { expiresIn: "1d" }
      );
  
      res.status(201).json({
        message: "user created",
        token: jwtToken,
        user: {
          firstName: newUser.firstName,
          type: newUser.type,
          profilePicture: newUser.profilePicture,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error("Google Login Error:", error.message);
      res.status(500).json({
        message: "Google login failed",
        error: error.message,
      });
    }
  }


//admin@gmail.com
//pasword123

// user11@gmail.com
// pasword123