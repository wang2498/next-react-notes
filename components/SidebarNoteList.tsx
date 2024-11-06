import { getAllNotes } from '@/lib/redis'
import SidebarNoteItem from './SidebarNoteItem'
export default async function NoteList() {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
  await sleep(3000)
  const notes: Record<string, string> = await getAllNotes()

  const arr = Object.entries(notes) as [string, string][]

  if (arr.length == 0) {
    return <div className="notes-empty">{'No notes created yet!'}</div>
  }
  return (
    <ul className="notes-list">
      {arr.map(([noteId, note]) => {
        return (
          <li key={noteId}>
            <SidebarNoteItem noteId={noteId} note={JSON.parse(note) as Note} />
          </li>
        )
      })}
    </ul>
  )
}
