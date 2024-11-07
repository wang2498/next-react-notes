'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addNote, delNote, updateNote } from '@/lib/redis'
import { z } from 'zod'
import { sleep } from '@/lib/utils'

const schema = z.object({
  title: z.string().min(1, '请填写标题'),
  content: z.string().min(1, '请填写内容').max(100, '字数最多100'),
})

export interface FormData {
  get: (name: string) => FormDataEntryValue | null
}

export type SaveNoteResult = {
  msg: string
  errors: string | null
}

export type NoteData = {
  title: FormDataEntryValue | null
  content: FormDataEntryValue | null
  updateTime: Date
}
export const saveNote = async (prevState: SaveNoteResult, formData: FormData) => {
  const noteId = formData.get('noteId')
  const note = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date(),
  }
  console.log(note, 'note-----')
  const validated = schema.safeParse(note)
  console.log(validated, 'validated---')
  if (!validated.success) {
    return {
      msg: '',
      errors: validated.error.issues.map((i) => i.message).join(';'),
    }
  }
  await sleep(2000)
  if (noteId) {
    updateNote(noteId as string, JSON.stringify(note))
    revalidatePath('/', 'layout')
    // redirect(`/note/${noteId}`)
    return { message: 'Update Success!', errors: null }
  } else {
    const res = await addNote(JSON.stringify(note))
    if (!res) {
      return { message: 'Add Fail!', errors: null }
    }
    revalidatePath('/', 'layout')
    // redirect(`/note/${res}`)
    return { message: 'Update Success!', errors: null }
  }
}

export const deleteNote = async (prevState: SaveNoteResult, formData: FormData) => {
  const noteId = formData.get('noteId')
  if (!noteId) {
    return { message: 'Delete Fail!', errors: null }
  }
  delNote(noteId as string)
  revalidatePath('/', 'layout')
  redirect('/')
  return { message: 'Delete Success!', errors: null }
}
