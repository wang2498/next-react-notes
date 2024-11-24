import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: '密码登录',
      credentials: {
        username: { label: '邮箱', type: 'text', placeholder: '输入您的邮箱' },
        password: { label: '密码', type: 'password', placeholder: '输入您的密码' },
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
