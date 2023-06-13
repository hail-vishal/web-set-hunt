import errorCodes from "../../../utils/errorCodes";
import User from "../../../models/User";
import Team from "../../../models/Team";
import connectToDatabase from '../../../utils/database';
import { authOptions } from "../auth/[...nextauth]";
import { verifySession } from "../../../utils/auth";
import runMiddleware from "../../../utils/cross-site";

const joinTeam = async (req, res) => {
  try{
    await runMiddleware(req,res);
  }
  catch(error){
    return res.status(500);
  }
  if (req.method !== 'POST') {
    return res.status(errorCodes.NOT_FOUND).json({ message: 'check the http method used' });
  }

  try {
    const { isValid, session } = await verifySession(req, res, authOptions);
    if (!isValid) {
      return res.status(errorCodes.FORBIDDEN).json({ message: 'Unauthorized!' });
    }
    // console.log(req.body);
    const { teamId } = req.body;
    const { email } = session?.user;
    // console.log(session);
    // console.log(teamId);
    await connectToDatabase();
    let user = await User.findOne({ email });
    if (user && user.teamId) {
      return res
        .status(errorCodes.CREATE_ERROR)
        .json({ message: "You already join a team" });
    }
    let team = await Team.findOne({ teamId });
    // console.log(team);
    if (!team) {
      return res
        .status(errorCodes.SUCCESS_NOT_FOUND)
        .json({ message: "team not found check code" });
    }
    if (team.members.length === 2) {
      return res
        .status(errorCodes.SUCCESS_TEAM_FULL)
        .json({ message: "Team already have 2 members" });
    }
    team.members.push(user._id);
    await team.save();
    user.teamId = teamId;
    user.teamName = team.teamName;
    await user.save();
    let teamMembers = [];
    if (team) {
      for (let i = 0; i < team.members.length; i++) {
        const member = await User.findOne({ _id: team.members[i] });
        teamMembers.push(member.name);
      }
    }

    return res
      .status(errorCodes.SUCCESS)
      .json({ message: "team joining successful", team,user });
  } catch (err) {
    // console.log(err);
    return res
      .status(errorCodes.INTERNAL_ERROR)
      .json({ message: "error in joining team" });
  }
};

export default joinTeam;