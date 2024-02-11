import { useState } from "react"
import { useTasksContext } from "../hooks/useTasksContext"
import { useAuthContext } from '../hooks/useAuthContext'

const TaskForm = () => {
  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const task = {title, description, deadline}

    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      console.log("aa")
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setDescription('')
      setDeadline('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_MEDICATION', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>

      <label>Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        maxLength = "25"
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Description:</label>
      <input 
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <label>deadline:</label>
      <input 
        type="date"
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
        className={emptyFields.includes('deadline') ? 'error' : ''}
      />

      <button>Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TaskForm