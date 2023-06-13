import { hash, compare } from 'bcryptjs';
import { unstable_getServerSession } from 'next-auth';

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function verifySession(req,res,authOptions){
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return {isValid:false,session};
  }
  return {isValid:true,session};
}