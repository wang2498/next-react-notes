import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <img className="logo" width="20px" height="20px" src="/logo.svg" alt="logo" role="presentation" />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          123
        </section>
        <nav>333</nav>
      </section>
    </>
  )
}
