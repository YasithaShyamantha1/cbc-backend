import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true,

    },
    isBlocked : {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: ["admin", "user","customer"],  // For example, types could be 'admin' or 'user'
        default: "user",
    },
    profilePicture:{
        type: String,
        default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1732627559~exp=1732631159~hmac=ca959d488bd4646e30c668efba307f5504dbd36d97a0ae1c11dd7ec549020b02&w=740"

    }, 


})
const User = mongoose.model("users",userSchema)

export default User;