import './login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import GoogleButton from '../components/GoogleButton'
import api, { errorMessage } from '../api'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/home')
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Please enter your credentials" onSubmit={handleSubmit}>
      <FormInput
        label="Email"
        type="email"
        id="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        label="Password"
        type="password"
        id="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="options-row">
        <label className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">Remember me</span>
        </label>
        <a href="#" className="forgot-link">Forgot password ?</a>
      </div>

      {error && <p style={{ color: '#d93025', fontSize: 14, margin: '0 0 8px' }}>{error}</p>}

      <Button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
      <GoogleButton />

      <p className="footer-text">
        Don't have an account? <Link to="/signup">Sign up for free</Link>
      </p>
    </AuthLayout>
  )
}

export default Login
