import { useEffect, useState } from 'react'
import api, { errorMessage } from '../api'
import './TodoList.css'

function TodoList() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // READ: load the logged-in user's tasks
  useEffect(() => {
    api
      .get('/tasks')
      .then((res) => setTasks(res.data.tasks))
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false))
  }, [])

  // CREATE
  const addTask = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setError('')
    try {
      const res = await api.post('/tasks', { title })
      setTasks((prev) => [res.data.task, ...prev])
      setTitle('')
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  // UPDATE (mark done / not done)
  const toggleTask = async (task) => {
    setError('')
    try {
      const res = await api.put(`/tasks/${task.id}`, { completed: !task.completed })
      setTasks((prev) => prev.map((t) => (t.id === task.id ? res.data.task : t)))
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  // UPDATE (rename)
  const saveEdit = async (id) => {
    if (!editTitle.trim()) return
    setError('')
    try {
      const res = await api.put(`/tasks/${id}`, { title: editTitle })
      setTasks((prev) => prev.map((t) => (t.id === id ? res.data.task : t)))
      setEditingId(null)
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  // DELETE
  const deleteTask = async (id) => {
    setError('')
    try {
      await api.delete(`/tasks/${id}`)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  return (
    <section className="todo">
      <h2 className="todo-heading">My Tasks</h2>

      <form className="todo-add" onSubmit={addTask}>
        <input
          className="todo-input"
          type="text"
          placeholder="Add a new task..."
          maxLength={200}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="todo-btn todo-btn-main">Add</button>
      </form>

      {error && <p className="todo-error">{error}</p>}

      {loading ? (
        <p className="todo-empty">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="todo-empty">No tasks yet. Add your first one above.</p>
      ) : (
        <ul className="todo-list">
          {tasks.map((task) => (
            <li key={task.id} className="todo-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task)}
                aria-label={`Mark "${task.title}" as done`}
              />

              {editingId === task.id ? (
                <>
                  <input
                    className="todo-input"
                    type="text"
                    maxLength={200}
                    value={editTitle}
                    autoFocus
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(task.id)
                      if (e.key === 'Escape') setEditingId(null)
                    }}
                  />
                  <button className="todo-btn todo-btn-main" onClick={() => saveEdit(task.id)}>Save</button>
                  <button className="todo-btn" onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span className={task.completed ? 'todo-title todo-done' : 'todo-title'}>
                    {task.title}
                  </span>
                  <button
                    className="todo-btn"
                    onClick={() => {
                      setEditingId(task.id)
                      setEditTitle(task.title)
                    }}
                  >
                    Edit
                  </button>
                  <button className="todo-btn todo-btn-danger" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default TodoList
