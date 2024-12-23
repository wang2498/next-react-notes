import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { addUser, getUser } from '@/lib/redis'
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: '密码登录',
      credentials: {
        username: { label: '邮箱', type: 'text', placeholder: '输入您的邮箱' },
        password: { label: '密码', type: 'password', placeholder: '输入您的密码' },
      },
      async authorize(credentials, req) {
        let user = null
        user = await getUser(credentials.username, credentials.password)

        if (user === 1) return null

        if (user === 0) {
          user = await addUser(credentials.username, credentials.password)
        }
        if (!user) {
          throw new Error('User was not found and could not be created.')
        }
        return user
      },
    }),
    GitHub,
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname.startsWith('/note/edit')) return !!auth
      return true
    },
  },
})
