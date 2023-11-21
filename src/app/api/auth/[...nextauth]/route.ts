import { DashboardUserRole } from "@/app/types";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { useReducer } from "react";

export const authOptions = {
    providers: [
        DiscordProvider({

            profile(profile) {

                console.log(profile.id);

                let user_role: DashboardUserRole = 'user';

                if (profile.id ===
                    '285474318513602561' ||
                    '285424116725710849' ||
                    '715832738879373353'
                ) {
                    user_role = 'admin';
                    return {
                        ...profile,
                        role: user_role,
                        name: profile.username,
                        image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
                    };
                }
                else if (profile.id ===
                    '605037700650893312' ||
                    '273800336710565888' ||
                    '699954782978310244' ||
                    '311097844767653889' ||
                    '714844088976932945' ||
                    '720533507427926056'
                ) {
                    user_role = 'staff';
                    return {
                        ...profile,
                        role: user_role,
                        name: profile.username,
                        image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
                    };
                }
                else {
                    user_role = 'user';
                    return {
                        ...profile,
                        role: user_role,
                        name: profile.username,
                        image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
                    };
                }

            },
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
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                console.log(user)
                token.role = user.role
                token.name = user.name
                token.avatar = user.image
            }
            return token
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.role = token.role
                session.name = token.name
                session.avatar = token.avatar
            }
            return session
        }
    }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };