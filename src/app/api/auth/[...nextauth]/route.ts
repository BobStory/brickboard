import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            authorization: {
                url: 'https://discord.com/api/oauth2/authorize',
                params: {
                    scope: 'identify guilds'
                }
            }
        }),
    ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };