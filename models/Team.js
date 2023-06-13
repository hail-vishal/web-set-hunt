import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  latestTime: {
    type: Date,
  },
  solveCount: {
    type: Number,
    default:0
  },
  position: {
    type: Number,
  },
  change: {
    type: Number,
  },
});

export default mongoose.models.Team || mongoose.model("Team", teamSchema);
