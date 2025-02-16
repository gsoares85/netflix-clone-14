import NextAuth, {NextAuthOptions} from 'next-auth'
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prismaDb from "@/lib/prismadb";
import {compare} from 'bcrypt';
import {PrismaAdapter} from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
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

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
