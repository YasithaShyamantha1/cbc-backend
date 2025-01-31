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
            }, process.env.SECRET);

            res.json({
                message: "User logged in",
                token: token,
                user: {
                    firstName:user.firstName,
                    type:user.type,
                    profilePicture:user.UserprofilePicture,
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

// export function isAdmin(req){
//     if(req.user==null){
//         return false;
//     }

//     if(req.user.type != "admin"){
//         return false;
//     }

//     return true
// }

export function isCustomer(req){
    if(req.user==null){
        return false;
    }

    if(req.user.type != "user"){
        return false;
    }

    return true
}
export async function googleLogin(req,res){
    const token= req.body.token
    //https://www.googleapis.com/oauth2/v3/userinfo
     try{
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
            // headers:{
            //     Authentication: `Bearer ${token}`
            // }
        })
        const email = response.data.email
    //check if user exists
    const usersList = await User.find({email: email})
    if(usersList.length >0){
      const user = usersList[0]
      const token = jwt.sign({
        email : user.email,
        firstName : user.firstName,
        lastName : user.lastName,
        isBlocked : user.isBlocked,
        type : user.type,
        profilePicture : user.profilePicture
      } , process.env.SECRET)
      res.json({
        message: "User logged in",
        token: token,
        user : {
          firstName : user.firstName,
          lastName : user.lastName,
          type : user.type,
          profilePicture : user.profilePicture,
          email : user.email
        }
      })
    }else{
      //create new user
      const newUserData = {
        email: email,
        firstName: response.data.given_name,
        lastName: response.data.family_name,
        type: "customer",
        password: "ffffff",
        profilePicture: response.data.picture
      }
      const user = new User(newUserData)
      user.save().then(()=>{
        res.json({
          message: "User created"
        })
      }).catch((error)=>{
        res.json({      
          message: "User not created"
        })
      })

    }
    
  }catch(e){
    res.json({
      message: "Google login failed"
    })
  }


}


//user@example1.com
//securepassword123