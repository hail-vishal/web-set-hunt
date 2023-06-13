import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionNo: Number,
  questionURL: String,
  questionAns: String,
});

export default mongoose.models.Question || mongoose.model("Question", questionSchema);
