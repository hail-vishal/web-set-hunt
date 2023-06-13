import Team from "../../models/Team";
import connectToDatabase from "../../utils/database";
import errorCodes from "../../utils/errorCodes";
import { authOptions } from "./auth/[...nextauth]";
import { verifySession } from "../../utils/auth";
import runMiddleware from "../../utils/cross-site";


const getLeaderBoard = async (req, res) => {
    try {
        await runMiddleware(req,res);
        if (req.method !== 'GET') {
            return res.status(errorCodes.NOT_FOUND).json({ message: 'check the http method used' });
        }
        let query = {};
        let sort = { solveCount: -1, latestTime: 1 };
        const isValid = await verifySession(req, res, authOptions);
        if (!isValid) {
            return res.status(errorCodes.FORBIDDEN).json({ message: 'Unauthorized!' });
        }
        await connectToDatabase();
        let newLeaderboard = await Team.find(query).sort(sort);
        newLeaderboard.forEach(async (team, newposition) => {
            const change = team.position - (newposition + 1);
            let result = await Team.findByIdAndUpdate(
                team._id,
                { position: newposition + 1, change: change },
                { new: true }
            );
        });

        newLeaderboard = await Team.find(query).sort(sort).populate("members");
        res.status(errorCodes.SUCCESS).json({ message: "Leaderboard loaded!", leaderboard: newLeaderboard });

    } catch (err) {
        // console.log(err);
        res.status(errorCodes.INTERNAL_ERROR).json({ message: "something went wrong" });
    }
};

export default getLeaderBoard;
