import {AuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prismaDb from "@/lib/prismadb";
import {compare} from "bcrypt";
import {PrismaAdapter} from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({

            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null
                }

                if(!credentials.email || !credentials.password) {
                    return null
                }
                const user = await prismaDb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if(!user || !user.hashedPassword) {
                    throw new Error('Invalid credentials')
                }

                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
                if(!isCorrectPassword) {
                    throw new Error('Invalid credentials')
                }

                return user;
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'github' || account?.provider === 'google') {
                await prismaDb.user.upsert({
                    where: { email: user.email },
                    update: { image: user.image },
                    create: {
                        email: user.email!,
                        image: user.image!,
                        name: user.name!,
                    },
                });
            }
            return true;
        },
        async jwt({ token, account}) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, user }) {
            session.user = user;
            return session;
        }
    },
    pages: {
        signIn: '/auth'
    },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismaDb),
    session: {
        strategy: 'jwt'
    },
    jwt: {
        maxAge: 60 * 60,
    }
};