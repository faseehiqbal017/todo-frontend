function Button({ children, onClick, type = 'button', disabled = false }) {
  return (
    <button type={type} className="btn btn-primary" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
