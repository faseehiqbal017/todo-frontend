import pic from '../pic.jpg'
// Shared two-column layout used by the Login and Signup pages:
// form on the left, picture on the right.
function AuthLayout({ title, subtitle, children, onSubmit }) {
  return (
    <div className="login-card">
      <div className="form-selction">
        <div className="box">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <form className="form" onSubmit={onSubmit}>{children}</form>
      </div>
      <div className="image-section">
        <img src={pic} alt="" />
      </div>
    </div>
  )
}

export default AuthLayout
