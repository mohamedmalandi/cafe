import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter email and password');
                }

                // Get credentials from environment variables
                const adminEmail = process.env.ADMIN_EMAIL;
                const adminPassword = process.env.ADMIN_PASSWORD;

                if (!adminEmail || !adminPassword) {
                    throw new Error('Admin credentials not configured');
                }

                // Simple comparison (case-insensitive email)
                const isEmailValid = credentials.email.toLowerCase() === adminEmail.toLowerCase();
                const isPasswordValid = credentials.password === adminPassword;

                if (!isEmailValid || !isPasswordValid) {
                    throw new Error('Invalid email or password');
                }

                // Return user object
                return {
                    id: '1',
                    email: adminEmail,
                    name: 'Admin',
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
