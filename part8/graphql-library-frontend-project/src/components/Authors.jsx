import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../graphql-definitions/authors'
import { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const { data: { allAuthors } = {} } = useQuery(ALL_AUTHORS)
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: () => {
      setSelectedAuthor(null)
      setBorn('')
    },
  })
  const [born, setBorn] = useState('')
  // eslint-disable-next-line react/prop-types
  if (!props.show) {
    return null
  }

  const updateAuthorBirthday = (event) => {
    event.preventDefault()
    updateAuthor({
      variables: { name: selectedAuthor.value, setBornTo: Number(born) },
    })
  }

  return (
    <div>
      <h2>authors</h2>
      {allAuthors && (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>Set birthday</h3>
      <form onSubmit={updateAuthorBirthday}>
        <div>
          <Select
            defaultValue={selectedAuthor}
            onChange={setSelectedAuthor}
            value={selectedAuthor}
            options={allAuthors?.map((author) => ({
              value: author.name,
              label: author.name,
            }))}
            placeholder='Select an author for update...'
          />
        </div>
        <div>
          born
          <input
            required={true}
            value={born}
            type='number'
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors
