'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useCallback, useTransition, useEffect } from 'react'

type Props = {
  id: string
  title: string
  expandedChildren: React.ReactNode
  children: React.ReactNode
}
export default function NoteItemContent({ id, title, expandedChildren, children }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const selectedId = pathname.split('/')[2] || null

  const [isPending, startTransition] = useTransition()
  const [isExpanded, setIsExpanded] = useState(false)
  const isActive = id === selectedId
  const itemRef = useRef<HTMLDivElement>(null)
  const prevTitleRef = useRef(title)

  const handleOpenContent = useCallback(() => {
    const sidebarToggle = document.getElementById('sidebar-toggle') as HTMLInputElement
    if (sidebarToggle) {
      sidebarToggle.checked = true
    }
    router.push(`/note/${id}`)
  }, [id, router])

  useEffect(() => {
    if (title !== prevTitleRef.current && itemRef.current) {
      prevTitleRef.current = title
      itemRef.current.classList.add('flash')
    }
  }, [title])
  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current?.classList.remove('flash')
      }}
      className={['sidebar-note-list-item', isExpanded ? 'note-expanded' : ''].join(' ')}
    >
      {children}
      <button
        className="sidebar-note-open"
        style={{
          backgroundColor: isPending ? 'var(--gray-80)' : isActive ? 'var(--tertiary-blue)' : '',
          border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
        }}
        onClick={handleOpenContent}
      >
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          startTransition(() => {
            e.stopPropagation()
            setIsExpanded(!isExpanded)
          })
        }}
      >
        {isExpanded ? (
          <img src="/chevron-down.svg" width="10px" height="10px" alt="Collapse" />
        ) : (
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  )
}
