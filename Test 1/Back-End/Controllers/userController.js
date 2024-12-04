import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){

    const newUserData = req.body

    newUserData.password = bcrypt.hashSync(newUserData.password, 10)


    const user = new User(req.body)

    user.save().then(()=>{
        res.json({
            message:"User Created"
        })
    }
    ).catch(()=>{
        res.json({
            message:"User Not Created"
        })
    })
}

export function loginUser(req,res){
    User.find({email: req.body.email}).then(
        (user)=>{
            if(user.lenght === 0){
                res.json({
                    message: "User not Found"
                })
            }
            else{
                const newUser = user[0]
                console.log("Retrieved User:", newUser);

                const isPasswordCorresct = bcrypt.compareSync(req.body.password,newUser.password)
                
                if(isPasswordCorresct){

                    const token =jwt.sign({
                        email : newUser.email,
                        firstName: newUser.firstName,
                        lastName:newUser.lastName,
                        isBlocked:newUser.isBlocked,
                        type:newUser.type,
                        profilePicture: newUser.profilePicture

                    }, "cbc-secret-key")
                    
                    res.json({
                        message:"User logged in",
                        token: token
                    })
                    
                }else{
                    res.json({
                        message:"User Not Logged in"
                    })
                }
            }
            
        }
    )
}
