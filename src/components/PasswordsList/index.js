import './index.css'

const PasswordsList = props => {
  const {passwordDetails, onDeletePassword, passwordValue} = props
  const {website, username, password, id} = passwordDetails

  const profileLogo = website[0].toUpperCase()

  const passwordEl = passwordValue ? password : '********'

  const onDeleteList = () => {
    onDeletePassword(id)
  }

  return (
    <li className="list-item-card">
      <button type="button" className="profile-logo">
        {profileLogo}
      </button>
      <div className="content">
        <p className="website-style">{website}</p>
        <p className="user-style">{username}</p>
        <p className="password-style">{passwordEl}</p>
      </div>
      <button type="button" className="delete-btn" onClick={onDeleteList}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordsList
