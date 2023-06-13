import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Default User'
  },
  rollNumber: {
    type: Number,
  },
  email: {
    type: String,
    unique:true
  },
  password:{
    type:String,
  },
  loginWithGoogle:{
    type:Boolean
  }
  ,
  teamId: String,
  mobileNumber: String,
  teamName: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);

