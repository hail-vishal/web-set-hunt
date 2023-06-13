import errorCodes from "../../../utils/errorCodes";
import User from "../../../models/User";
import Team from "../../../models/Team";
import connectToDatabase from '../../../utils/database';
import { authOptions } from "../auth/[...nextauth]";
import { verifySession } from "../../../utils/auth";
import runMiddleware from "../../../utils/cross-site";

const generateTeamCode = (count) => {
  const chars = "acdefhiklmnoqrstuvwxyz0123456789".split("");
  let result = "";
  for (let i = 0; i < count; i++) {
    let x = Math.floor(Math.random() * chars.length);
    result += chars[x];
  }
  return result;
};

const createTeam = async (req, res) => {
  try{
    await runMiddleware(req,res);
  }
  catch(error){
    return res.status(500);
  }
  if(req.method !=='POST')
  return res.status(errorCodes.NOT_FOUND).json({message:'wrong request method'});

  const {isValid,session} = await verifySession(req,res,authOptions);
  if(!isValid){
    return res.status(errorCodes.FORBIDDEN).json({ message: 'Unauthorized!' });
  }
  const teamId = generateTeamCode(6);
  const { teamName } = req.body;
  const {email}=session.user;
  try {
    await connectToDatabase();
    let user = await User.findOne({ email });
    if (user.teamId) {
      return res
        .status(errorCodes.CREATE_ERROR)
        .json({ message: "already in a team" });
    }
    const teamSameName = await Team.find({ teamName });
    if (teamSameName.length !== 0) {
      return res
        .status(errorCodes.CREATE_ERROR)
        .json({ message: "This name is already taken use some other team name!" });
    }
    const teams = await Team.find();
    const newTeam = new Team({
      teamId,
      teamName,
      position: (teams ? teams.length : 0) + 1,
      change: 0,
      solveCount: 0,
      members: [user._id],
    });
    await newTeam.save();
    user.teamId = newTeam.teamId;
    user.teamName = newTeam.teamName;
    await user.save();
    return res
      .status(errorCodes.SUCCESS)
      .json({
        message: "Team created successfully",
        team: newTeam,
      });
  } catch (err) {
    return res
      .status(errorCodes.INTERNAL_ERROR)
      .json({ message: "erron in creating the team! try again later" });
  }
};

export default createTeam;