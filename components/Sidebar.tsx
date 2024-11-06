import { getAllNotes } from '@/lib/redis'
import Link from 'next/link'
import React, { Suspense } from 'react'
import SidebarNoteList from './SidebarNoteList'
import EditButton from './EditButton'
import NoteListSkeleton from './NoteListSkeleton'
export default async function Sidebar() {
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
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
}
