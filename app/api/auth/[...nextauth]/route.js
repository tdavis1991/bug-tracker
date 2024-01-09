import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();

      return session
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExist = await User.findOne({ email: profile.email });

        if(!userExist) {
          const newUser = await User.create({
            fullname: profile.name,
            email: profile.email,
            avatar: profile.picture,
          })
          return newUser
        }

        return new Response(JSON.stringify(userExist), { status: 201, message: 'User created sucessfully' })
      } catch (error) {
        throw new Error('Failed to create user: ' + error.message);
      }
    }
  }
})

export { handler as GET, handler as POST };