import dayjs from 'dayjs'
import EditButton from './EditButton'
import NotePreview from './NotePreview'
export default function Note({ noteId, note }: { noteId: string; note: Note }) {
  const { title, content, updateTime } = note

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            Last Updated on {dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss')}
          </small>
          <EditButton noteId={noteId}>Edit</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  )
}
