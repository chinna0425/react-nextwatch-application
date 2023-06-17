import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'
import ContextOptions from '../../ReactContext'

class Login extends Component {
  state = {username: '', password: '', status: false, errmsg: '', sh: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitTheForm = async event => {
    event.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const res = await fetch(url, options)
    const respo = await res.json()
    console.log(respo)
    if (res.ok) {
      const jwt = {jwttoken: respo.jwt_token}
      Cookies.set('jwt_token', jwt.jwttoken, {expires: 30})
      history.replace('/')
      this.setState({status: false, errmsg: '', username: '', password: ''})
    } else {
      this.setState({status: true, errmsg: respo.error_msg})
    }
  }

  onShowPassword = () => {
    this.setState(prev => ({sh: !prev.sh}))
  }

  render() {
    const {username, password, status, errmsg, sh} = this.state
    console.log(password)
    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }
    const pas = sh ? 'text' : 'password'
    return (
      <ContextOptions.Consumer>
        {value => {
          const {themeChange} = value
          return (
            <div
              className={`login-main-container ${
                themeChange ? 'login-theme-back' : null
              }`}
            >
              <div
                className={`login-inner-container ${
                  themeChange ? 'login-theme-form' : null
                }`}
              >
                {themeChange ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                    className="login-logo"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    className="login-logo"
                  />
                )}
                <form
                  className="login-form-container"
                  onSubmit={this.onSubmitTheForm}
                >
                  <div className="login-input-container">
                    <label
                      htmlFor="username"
                      className={`login-label-item ${
                        themeChange ? 'login-theme-title' : null
                      }`}
                    >
                      USERNAME
                    </label>
                    <br />
                    <input
                      type="text"
                      id="username"
                      className="login-input-item"
                      placeholder="Username"
                      value={username}
                      onChange={this.onChangeUsername}
                    />
                  </div>
                  <div className="login-input-container">
                    <label
                      htmlFor="password"
                      className={`login-label-item ${
                        themeChange ? 'login-theme-title' : null
                      }`}
                    >
                      PASSWORD
                    </label>
                    <br />
                    <input
                      type={pas}
                      className="login-input-item"
                      id="password"
                      value={password}
                      onChange={this.onChangePassword}
                      placeholder="Password"
                    />
                  </div>
                  <div className="login-checkbox-container">
                    <input
                      type="checkbox"
                      id="checkbox"
                      onClick={this.onShowPassword}
                      className="login-checkbox-item"
                    />
                    <label
                      htmlFor="checkbox"
                      className={`login-checkbox-label ${
                        themeChange ? 'login-theme-title' : null
                      }`}
                    >
                      Show Password
                    </label>
                  </div>
                  <div>
                    <button type="submit" className="login-button-style">
                      Login
                    </button>
                  </div>
                  {status ? (
                    <p className="error-message-para">*{errmsg}</p>
                  ) : null}
                </form>
              </div>
            </div>
          )
        }}
      </ContextOptions.Consumer>
    )
  }
}
export default Login
