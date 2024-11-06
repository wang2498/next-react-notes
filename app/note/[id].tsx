export default async function Note({ params }: { params: any }) {
  console.log(params, '---params')
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">`111111`</span>
    </div>
  )
}
