import './signup.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import GoogleButton from '../components/GoogleButton'
import api, { errorMessage } from '../api'

function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) return setError('Passwords do not match')

    setLoading(true)
    try {
      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      })
      navigate('/login')
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome" subtitle="Please Enter the details for signup" onSubmit={handleSubmit}>
      <FormInput label="Name" type="text" id="name" placeholder="Enter your Name"
        value={form.name} onChange={update('name')} />
      <FormInput label="Email" type="email" id="email" placeholder="Enter your email address"
        value={form.email} onChange={update('email')} />
      <FormInput label="Password" type="password" id="password1" placeholder="Enter your password"
        value={form.password} onChange={update('password')} />
      <FormInput label="Confirm Password" type="password" id="password2" placeholder="Enter your password again"
        value={form.confirm} onChange={update('confirm')} />

      {error && <p style={{ color: '#d93025', fontSize: 14, margin: '0 0 8px' }}>{error}</p>}

      <Button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'SignUp'}</Button>
      <GoogleButton />

      <p className="footer-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </AuthLayout>
  )
}

export default Signup
