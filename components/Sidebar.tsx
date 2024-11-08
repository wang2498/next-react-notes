import Link from 'next/link'
import React, { Suspense } from 'react'
import SidebarNoteList from './SidebarNoteList'
import EditButton from './EditButton'
import NoteListSkeleton from './NoteListSkeleton'
import SidebarSearchField from './SidebarSearchField'
import { useTranslation } from '@/app/i18n/index'
export default async function Sidebar({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng)
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
          <SidebarSearchField />
          <EditButton noteId={null}>{t("new")}</EditButton>
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
