import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { verifyPassword } from '../../../utils/auth';
import connectToDatabase from '../../../utils/database';
import User from '../../../models/User';

export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials) {
        await connectToDatabase();
        if (!credentials || !credentials.email || !credentials.password) {
          console.log('fallback');
          return null;
        }
        let user = await User.findOne({
          email: credentials.email,
          
        });
        const set = new Set(['r19zf8', 'lxirc7', 'kt1mr2', 'tl0owl', 'rwok0q', 'w48etu', 'ln8ffc'
        , 'feeffy', 'nr1efv', 'kzy8hz', 'm2ds18', 'l7kr3x', '3xhwoh', 'n7u5h1',
         'fq6thq', 'yu220t', 'lfmhkk', 'z4zxf6','q6uaiw', 'oh2hml','3t9lx7','rahahm','2fcmw0',
        'wm111y','xtxnrk','yw11xu','nqyv97','l45fv7','5n4l19','wd7cfw','q2whz2','xderze']);
        if (!user || !user.teamId || !set.has(user.teamId)) {
          return null;
        }
        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          return null;
        }
        return {
          email: user.email
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      // // console.log('token callback');
      // try{
      //   // console.log(token);
      //   // console.log(user);
      //   // console.log('account');
      //   // console.log(account);
      //   // if(user && user.email){
      //   //   await connectToDatabase();
      //   //   const newUser = await User.findOne({email:[user.email]});
      //     // console.log('newUser');
      //     // console.log(newUser);
      //     // token.user = newUser;
      //     // console.log(token);
      //     return token;
      //   }
      // }
      // catch(error){
      //   console.log(error);
      //   return token;
      // } 
      // return token;
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      // console.log('session');
      // console.log(session);
      // console.log('token');
      // console.log(token);
      session.user = token.user;
      return session;
    },
    signIn: async ({ user }) => {
      try {
        await connectToDatabase();
        // console.log(user);
        const { email } = user;
        const entry = await User.findOne({ email });
        //  console.log(entry);
        // round 1:
        //  if(!entry){
        //     const newUser = new User({
        //       email:user.email,
        //       name:user.name,
        //       loginWithGoogle: true
        //     });
        //     await newUser.save();
        //  }
        // return true;


        //only for round two
        const set = new Set(['r19zf8', 'lxirc7', 'kt1mr2', 'tl0owl', 'rwok0q', 'w48etu', 'ln8ffc'
        , 'feeffy', 'nr1efv', 'kzy8hz', 'm2ds18', 'l7kr3x', '3xhwoh', 'n7u5h1',
         'fq6thq', 'yu220t', 'lfmhkk', 'z4zxf6','q6uaiw', 'oh2hml','3t9lx7','rahahm','2fcmw0',
        'wm111y','xtxnrk','yw11xu','nqyv97','l45fv7','5n4l19','wd7cfw','q2whz2','xderze']);
        if (!entry || !entry.teamId || !set.has(entry.teamId)) {
          return false;
        }

        return true;
      }
      catch (error) {
        // console.log(error);
        return false;
      }
    }
  }
  ,
  pages: {
    signIn: '/login',
    error:'/login'
  }
  ,
  secret: process.env.JWT_SECRET
}

export default NextAuth(authOptions);
