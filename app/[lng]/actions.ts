'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addNote, delNote, updateNote } from '@/lib/redis'
import { z } from 'zod'
import { isFileWithCode, sleep } from '@/lib/utils'
import { stat, mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import dayjs from 'dayjs'

const schema = z.object({
  title: z.string().min(1, '请填写标题'),
  content: z.string().min(1, '请填写内容').max(100, '字数最多100'),
})

export interface FormData {
  get: (name: string) => FormDataEntryValue | null
}

export type SaveNoteResult = {
  message: string
  errors: { message: string }[] | null
}

export type NoteData = {
  title: FormDataEntryValue | null
  content: FormDataEntryValue | null
  updateTime: Date
}
export const saveNote = async (prevState: SaveNoteResult, formData: FormData): Promise<SaveNoteResult> => {
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
      message: '',
      errors: validated.error.issues,
    }
  }
  await sleep(2000)
  if (noteId) {
    updateNote(noteId as string, JSON.stringify(note))
    revalidatePath('/', 'layout')
    redirect(`/note/${noteId}`)
    // return { message: 'Update Success!', errors: null }
  } else {
    const res = await addNote(JSON.stringify(note))
    if (!res) {
      return { message: 'Add Fail!', errors: null }
    }
    revalidatePath('/', 'layout')
    redirect(`/note/${res}`)
    // return { message: 'Update Success!', errors: null }
  }
}

export const deleteNote = async (prevState: SaveNoteResult, formData: FormData): Promise<SaveNoteResult> => {
  const noteId = formData.get('noteId')
  if (!noteId) {
    return { message: 'Delete Fail!', errors: null }
  }
  delNote(noteId as string)
  revalidatePath('/', 'layout')
  redirect('/')
  // return { message: 'Delete Success!', errors: null }
}

export const importNote = async (formData: FormData) => {
  const file = formData.get('file') as File | null

  // 空值判断
  if (!file) {
    return { error: 'File is required.' }
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const relativeUploadDir = `/uploads/${dayjs().format('YYYY-MM-DD')}`
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir)
  const fileExtension = file.name.split(".").pop()
  try {
    await stat(uploadDir)
  } catch (e) {
    if (isFileWithCode(e) && e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true })
    } else {
      console.error(e)
      return { error: 'stat wrong' };
    }
  }

  try {
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`
    const filename = file.name.replace(/\.[^/.]+$/, '')
    const filePath = join(uploadDir, `${filename}-${uniqueSuffix}.${fileExtension}`)
    await writeFile(filePath, buffer)
    const res = await addNote(
      JSON.stringify({
        title: filename,
        content: buffer.toString('utf-8'),
      })
    )
    return { fileUrl: `${relativeUploadDir}/${filePath}`, uid: res };
  } catch (e) {
    console.log(e)
    return { error: 'Something went wrong.' }
  }
}
