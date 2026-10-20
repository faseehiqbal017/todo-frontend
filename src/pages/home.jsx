import './home.css'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TodoList from '../components/TodoList'

function Home() {
  const navigate = useNavigate()
  let user = null
  try { user = JSON.parse(localStorage.getItem('user')) } catch { /* ignore */ }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <>
      <h1>Welcome to Dashboard{user ? `, ${user.name}` : ''}</h1>
      <Button onClick={logout}>Logout</Button>
      <TodoList />
    </>
  )
}

export default Home
