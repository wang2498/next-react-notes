import sanitizeHtml from 'sanitize-html'
import { marked } from 'marked'

const allowedTags = sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3'])

const allowedAttributes = Object.assign({}, sanitizeHtml.defaults.allowedAttributes, { img: ['alt', 'src'] })
export default function NotePreview({ children }: { children: string }) {
  return (
    <div className="note-preivew">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(marked(children || ''), {
            allowedTags,
            allowedAttributes,
          }),
        }}
      />
    </div>
  )
}
