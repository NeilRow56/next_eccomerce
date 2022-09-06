// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import bcryptjs from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/userModel'
import dbConnect from '../../../lib/dbConnect'



export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?._id) token._id = user._id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin
            return token
        },

        async session({ session, token }) {
            if (token?._id) session.user._id = token._id;
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
            return session;
          },
    },
    providers: [
        CredentialsProvider({
          async authorize(credentials) {
            await dbConnect();
            const user = await User.findOne({
              email: credentials.email,
            });
            
            if (user && bcryptjs.compareSync(credentials.password, user.password)) {
              return {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: 'f',
                isAdmin: user.isAdmin,
              };
            }
            throw new Error('Invalid email or password');
          },
          secret: process.env.JWT_SECRET,
        }),
      ],

  })