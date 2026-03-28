import NextAuth, { NextAuthOptions } from "next-auth";
import StravaProvider from "next-auth/providers/strava";

export const authOptions: NextAuthOptions = {
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_CLIENT_ID as string,
      clientSecret: process.env.STRAVA_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "read,activity:read_all",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.athleteId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken;
      // @ts-ignore
      session.athleteId = token.athleteId;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
