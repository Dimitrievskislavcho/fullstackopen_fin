/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to='/' style={padding}>
        anecdotes
      </Link>
      <Link to='/create' style={padding}>
        create new
      </Link>
      <Link to='/about' style={padding}>
        about
      </Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>

      <p>
        has {anecdote.votes} {anecdote.votes === 1 ? 'vote' : 'votes'}
      </p>

      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    See{' '}
    <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField('content')
  const { reset: resetAuthor, ...author } = useField('author')
  const { reset: resetInfo, ...info } = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button> <button type='reset'>reset</button>
      </form>
    </div>
  )
}

const Notification = ({ notification, setNotification }) => {
  const timerIdRef = useRef()

  useEffect(() => {
    if (notification) {
      timerIdRef.current = setTimeout(() => {
        setNotification('')
      }, 5000)
    }

    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current)
      }
    }
  }, [notification, setNotification])

  return <>{notification}</>
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState('')

  const anecdoteMatch = useMatch('/anecdotes/:id')

  const navigate = useNavigate()

  const anecdote = anecdotes.find(
    (anecdote) => anecdote.id.toString() === anecdoteMatch?.params.id
  )

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    navigate('/')
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification
        notification={notification}
        setNotification={setNotification}
      ></Notification>
      <Routes>
        <Route
          path='/'
          element={<AnecdoteList anecdotes={anecdotes} />}
        ></Route>
        <Route
          path='/anecdotes/:id'
          element={<Anecdote anecdote={anecdote} />}
        ></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/create' element={<CreateNew addNew={addNew} />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
