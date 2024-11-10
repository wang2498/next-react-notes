import { stat, mkdir, writeFile } from 'fs/promises'

import dayjs from 'dayjs'
import { join } from 'path'
import mime from 'mime'
import { NextRequest, NextResponse } from 'next/server'
import { isFileWithCode } from '@/lib/utils'
import { addNote } from '@/lib/redis'
export async function POST(request: NextRequest) {
  console.log(process.cwd(), 'process.cwd()')
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const relativeUpdateDir = `/uploads/${dayjs().format('YYYY-MM-DD')}`
  const uploadDir = join(process.cwd(), 'public', relativeUpdateDir)
  console.log(uploadDir, 'uploadDir')
  try {
    await stat(uploadDir)
  } catch (e) {
    if (isFileWithCode(e) && e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true })
    } else {
      console.error(e)
      return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
    }
  }
  try {
    console.log(file, 'file')
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`
    console.log(uniqueSuffix, 'uniqueSuffix')
    const filename = file.name.replace(/\.[^/.]+$/, '')
    console.log(filename, 'filename')
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(file.type)}`
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer)

    const res = await addNote(
      JSON.stringify({
        title: filename,
        content: buffer.toString('utf-8'),
      })
    )
    return NextResponse.json({
      fileUrl: `${relativeUpdateDir}/${uniqueFilename}`,
      uid: res,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
