'use client'

import { FormData, importNote } from '@/app/[lng]/actions'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { useFormStatus } from 'react-dom'

function Submit() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? 'Submitting' : 'Submit'}</button>
}
export default function SidebarImport() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  // const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const fileInput = e.target

  //   if (!fileInput.files || fileInput.files.length === 0) {
  //     console.warn('files list is empty')
  //     return
  //   }

  //   const file = fileInput.files[0]

  //   const formData = new FormData()
  //   formData.append('file', file)

  //   try {
  //     const response = await fetch('/api/upload', {
  //       method: 'POST',
  //       body: formData,
  //     })
  //     if (!response.ok) {
  //       console.error('error')
  //       return
  //     }
  //     const data = await response.json()
  //     router.push(`/note/${data.uid}}`)
  //     router.refresh()
  //   } catch (e) {
  //     console.error('something went wrong')
  //   }
  // }
  const upload = async (formData: FormData) => {
    const file = formData.get('file')
    if (!file) {
      console.warn('files list is empty')
      return
    }
    try {
      const data = await importNote(formData)
      if (data) {
        router.push(`/note/${data.uid}`)
      }
    } catch (e) {
      console.error('something went wrong')
    }

    formRef?.current?.reset()
  }
  return (
    <form action={upload} ref={formRef} style={{ textAlign: 'center' }}>
      <label htmlFor="file" style={{ cursor: 'pointer' }}>
        Import .md File
      </label>
      <input
        type="file"
        id="file"
        name="file"
        multiple
        style={{ position: 'absolute', clip: 'rect(0 0 0 0)' }}
        // onChange={onChange}
        accept=".md"
      />
      <div>
        <Submit />
      </div>
    </form>
  )
}
