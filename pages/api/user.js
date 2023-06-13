import User from "../../models/User";
import errorCodes from '../../utils/errorCodes';
import connectToDatabase from "../../utils/database";
import { verifySession } from "../../utils/auth";
import { authOptions } from "./auth/[...nextauth]";
import runMiddleware from "../../utils/cross-site";

const handler = async (req, res) => {
    try{
        await runMiddleware(req,res);
      }
      catch(error){
        return res.status(500);
      }
    const {isValid,session} = await verifySession(req, res, authOptions);
    if (!isValid) {
        return res.status(errorCodes.FORBIDDEN).json({ message: 'Unauthorized!' });
    }
    if (req.method === 'POST') {
        try {
            await connectToDatabase();
            const { name, mobileNumber, rollNumber, email } = req.body;
            const result = await User.findOneAndUpdate({ email }, { name, mobileNumber, rollNumber },{returnDocument:'after'});
            // console.log(result);
            return res.status(errorCodes.SUCCESS).json({ message: 'details updated successfully', user: result });
        }
        catch (error) {
            // console.log(error);
            return res.status(errorCodes.INTERNAL_ERROR).json({ message: 'error in updating details' });
        }
    }
    else if(req.method === 'GET'){
        try{
            await connectToDatabase();
            const {email} = session?.user;
            const reqUser = await User.findOne({email});
            return res.status(errorCodes.SUCCESS).json({message:'user data fetched successfully',user:reqUser});
        }
        catch(error){
            // console.log(error);
            return res.status(errorCodes.FORBIDDEN).json({message:'user data fetching failed'});
        }
    }
    return res.status(errorCodes.NOT_FOUND).json({message:'wrong req method'});
}

export default handler;