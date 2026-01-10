import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.isActive) {
          throw new Error('Invalid credentials')
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        )

        if (!isValidPassword) {
          throw new Error('Invalid credentials')
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// Role-based access control helpers
export const ROLE_PERMISSIONS = {
  ADMIN: ['*'], // All permissions
  STORE_MANAGER: [
    'customers:read',
    'customers:write',
    'orders:read',
    'orders:write',
    'inventory:read',
    'inventory:write',
    'appointments:read',
    'appointments:write',
    'repairs:read',
    'repairs:write',
    'analytics:read',
    'vendors:read',
  ],
  SALES_ASSOCIATE: [
    'customers:read',
    'customers:write',
    'orders:read',
    'orders:write',
    'appointments:read',
    'appointments:write',
    'inventory:read',
  ],
  INVENTORY_MANAGER: [
    'inventory:read',
    'inventory:write',
    'products:read',
    'products:write',
    'vendors:read',
    'vendors:write',
    'purchase_orders:read',
    'purchase_orders:write',
  ],
  FINANCE: [
    'orders:read',
    'analytics:read',
    'customers:read',
    'vendors:read',
    'purchase_orders:read',
  ],
  WORKSHOP_MANAGER: [
    'repairs:read',
    'repairs:write',
    'inventory:read',
    'appointments:read',
  ],
}

export function hasPermission(role: string, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS]
  if (!permissions) return false
  if (permissions.includes('*')) return true
  return permissions.includes(permission)
}
