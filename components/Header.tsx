import { signIn, signOut, auth } from 'auth'
import Link from 'next/link'

function SignIn({ provider, ...props }) {
  console.log(provider, 'provider----')
  return (
    <form
      action={async () => {
        'use server'
        await signIn(provider)
      }}
    >
      <button className="sign-btn" {...props}>
        Sign In
      </button>
    </form>
  )
}

function SignOut(props) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button className="sign-btn" {...props}>
        Sign Out
      </button>
    </form>
  )
}

export default async function Header() {
  const session = await auth()
  console.log(session, 'session------')
  return (
    <header style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Link href="/client">Client Side Component</Link>
      {session?.user ? (
        <span style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
          <img width="20px" height="20px" src={session?.user.image} alt="" />
          {session?.user.name}
          <SignOut />
        </span>
      ) : (
        <SignIn />
      )}
    </header>
  )
}
