import mongoose from "mongoose";

 const authScheme = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{ 
        type:String,
        required:true,
    },
    resettoken : {
        type:String,
        default: "",
        unique:true,
    },
    resettokenexpire : {
        type: Date,
        default: Date.now
    }

 },{ timestamps: true });

const authUser = mongoose.models.authusers ||  mongoose.model("authusers",authScheme);
export default authUser;