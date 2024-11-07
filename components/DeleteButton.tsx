import { useFormStatus } from 'react-dom'

type Props = {
  isDraft: boolean
  formAction: (payload: FormData) => void
}
export default function DeleteButton({ isDraft, formAction }: Props) {
  const { pending } = useFormStatus()
  return (
    !isDraft && (
      <button className="note-editor-delete" disabled={pending} formAction={formAction} role="menuitem">
        <img src="/cross.svg" width="10px" height="10px" alt="" role="presentation" />
        Delete
      </button>
    )
  )
}
