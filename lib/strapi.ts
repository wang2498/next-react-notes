export async function getAllNotes() {

  const response = await fetch(`http://localhost:1337/api/notes`)
  const data = await response.json();

  const res = {};

  data.data.forEach(({id, attributes: {title, content, slug, updatedAt}}) => {
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt
    })
  })

  return res
}

export async function addNote(data) {
  const response = await fetch(`http://localhost:1337/api/notes`, {
    method: 'POST',
    headers: {
      Authorization: 'bearer 174c54852d7c562a5a395cb8cc402a43356be98facf71bffceac2b254aa028d20e8abe29b3ba273d6c9683e7470834c0081d1cb863fc5a1b995748ec27c264318e97ff396d60eaf063b62a2795d95ea893bf4efb83d8e6db2d5e58711e7eb96f88cdd8dd2ccaaf3d29ea1cf32195203cb2f97ee31c3cd63854a81b2871e1ac78',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json();
  return res.data.attributes.slug
}

export async function updateNote(uuid, data) {
  const {id} = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: 'bearer 174c54852d7c562a5a395cb8cc402a43356be98facf71bffceac2b254aa028d20e8abe29b3ba273d6c9683e7470834c0081d1cb863fc5a1b995748ec27c264318e97ff396d60eaf063b62a2795d95ea893bf4efb83d8e6db2d5e58711e7eb96f88cdd8dd2ccaaf3d29ea1cf32195203cb2f97ee31c3cd63854a81b2871e1ac78',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json()
}

export async function getNote(uuid) {
  const response = await fetch(`http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`)
  const data = await response.json();
  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id
  }
}

export async function delNote(uuid) {
  const {id} = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'bearer 174c54852d7c562a5a395cb8cc402a43356be98facf71bffceac2b254aa028d20e8abe29b3ba273d6c9683e7470834c0081d1cb863fc5a1b995748ec27c264318e97ff396d60eaf063b62a2795d95ea893bf4efb83d8e6db2d5e58711e7eb96f88cdd8dd2ccaaf3d29ea1cf32195203cb2f97ee31c3cd63854a81b2871e1ac78',
      "Content-Type": "application/json"
    }
  })
  const res = await response.json()
}