import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req, res) {
    const newUserData = req.body;

    if(newUserData.type == "admin"){
        if(req.user==null){
            res,json({
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

    const user = new User(req.body);  // Use newUserData to avoid unwanted data

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
            }, "cbc-secret-key");

            res.json({
                message: "User logged in",
                token: token,
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
