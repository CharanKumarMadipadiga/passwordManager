import {Component} from 'react'

import {v4} from 'uuid'

import PasswordsList from '../PasswordsList'

import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isTrue: false,
  }

  onReadWebsite = event => {
    this.setState({website: event.target.value})
  }

  onReadUsername = event => {
    this.setState({username: event.target.value})
  }

  onReadPassword = event => {
    this.setState({password: event.target.value})
  }

  onAddPasswords = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPassword = {
      id: v4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
      isCheckBoxClicked: false,
      isTrue: true,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  filterPasswords = () => {
    const {passwordsList, searchInput} = this.state
    const SearchResults = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return SearchResults
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const filteredResults = passwordsList.filter(eachItem => eachItem.id !== id)

    const caseOf = filteredResults.length !== 0

    this.setState({passwordsList: filteredResults, isTrue: caseOf})
  }

  onClickCheckBox = e => {
    if (e.target.checked) {
      this.setState({isCheckBoxClicked: true})
    } else {
      this.setState({isCheckBoxClicked: false})
    }
  }

  render() {
    const {
      passwordsList,
      website,
      username,
      password,
      searchInput,
      isCheckBoxClicked,
    } = this.state

    let {isTrue} = this.state
    const filteredInputs = this.filterPasswords()
    const passwordValue = isCheckBoxClicked
    if (passwordsList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="app-container">
        <div className="password-manager">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="app-logo"
            alt="app logo"
          />

          <div className="password-input-card">
            <div className="input-card-img-container">
              <form
                className="input-card-container"
                onSubmit={this.onAddPasswords}
              >
                <p className="add-heading">Add New Password</p>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    className="logo-img"
                    alt="website"
                  />
                  <input
                    type="text"
                    className="input-El"
                    placeholder="Enter Website"
                    onChange={this.onReadWebsite}
                    value={website}
                  />
                </div>

                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                    className="logo-img"
                    alt="username"
                  />
                  <input
                    type="text"
                    className="input-El"
                    placeholder="Enter Username"
                    onChange={this.onReadUsername}
                    value={username}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    className="logo-img"
                    alt="password"
                  />
                  <input
                    type="password"
                    className="input-El"
                    placeholder="Enter Password"
                    onChange={this.onReadPassword}
                    value={password}
                  />
                </div>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-img"
              />
            </div>
          </div>
          <div className="password-list-card">
            <div className="nav-container">
              <div className="password-count-container">
                <p className="para">Your Passwords</p>
                <button type="button" className="passwords-btn">
                  {passwordsList.length}
                </button>
              </div>
              <div className="search-input-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-img"
                />
                <input
                  type="search"
                  className="input-El"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
              </div>
            </div>
            <hr className="line" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="check"
                className="checkbox-El"
                onChange={this.onClickCheckBox}
              />
              <p className="password">Show Passwords</p>
            </div>
            {!isTrue && (
              <div className="empty-state">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="empty-image"
                />
                <p className="no-passwords">No Passwords</p>
              </div>
            )}
            {isTrue && (
              <ul className="passwords-list">
                {filteredInputs.map(eachItem => (
                  <PasswordsList
                    key={eachItem.id}
                    passwordDetails={eachItem}
                    onDeletePassword={this.onDeletePassword}
                    passwordValue={passwordValue}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
