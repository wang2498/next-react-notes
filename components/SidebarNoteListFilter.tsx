'use client'
import { useSearchParams } from 'next/navigation'
import SidebarNoteItemContent from './SidebarNoteItemContent'
type Props = {
  notes: {
    noteId: string
    note: Note
    header: React.ReactElement
  }[]
}
const SidebarNoteListFilter: React.FC<Props> = ({ notes }) => {
  const searchParams = useSearchParams()
  const searchText = searchParams.get('q')
  return (
    <ul className="notes-list">
      {notes.map((noteItem) => {
        const { noteId, note, header } = noteItem
        if (!searchText || (searchText && note.title.toLowerCase().includes(searchText.toLowerCase()))) {
          return (
            <SidebarNoteItemContent
              key={noteId}
              id={noteId}
              title={note.title}
              expandedChildren={<p className="sidebar-note-excerpt">{note.content?.substring(0, 20) || <i>(No content)</i>}</p>}
            >
              {header}
            </SidebarNoteItemContent>
          )
        }
        return null
      })}
    </ul>
  )
}

export default SidebarNoteListFilter
