import Cookies from 'js-cookie'
import {Component} from 'react'
import Popup from 'reactjs-popup'
import {withRouter, Link} from 'react-router-dom'
import {FaMoon, FaBars} from 'react-icons/fa'
import {RiSunLine} from 'react-icons/ri'
import {FiLogOut} from 'react-icons/fi'
import ContextOptions from '../../ReactContext'

import './index.css'

class NavbarHeader extends Component {
  render() {
    return (
      <ContextOptions.Consumer>
        {value => {
          const {onLightDarkChange, themeChange, hamBurger, onHamBurger} = value
          const {booles} = this.props
          const {home, trending, gaming, saved} = booles

          const onChangeLogOut = () => {
            const {history} = this.props
            Cookies.remove('jwtToken')
            history.replace('/login')
          }
          const changeThemeIcon = () => {
            onLightDarkChange()
          }

          const onOpenHamburger = () => {
            onHamBurger()
          }
          return (
            <nav
              className={`nav-main-container ${
                themeChange ? 'dark-theme' : null
              }`}
            >
              <div className="nav-inner-container">
                <div>
                  {themeChange ? (
                    <Link to="/">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                        alt="website logo"
                        className="nav-logo-image"
                      />
                    </Link>
                  ) : (
                    <Link to="/">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="website logo"
                        className="nav-logo-image"
                      />
                    </Link>
                  )}
                  <div
                    className={`mobile-items-contianer ${
                      hamBurger ? null : 'on-mobile-view'
                    }`}
                  >
                    <Link to="/" className="mobile-link">
                      <h1
                        className={`header-mobileview-title ${
                          home ? 'title-cng-color' : null
                        }`}
                      >
                        Home
                      </h1>
                    </Link>
                    <Link to="/trending" className="mobile-link">
                      <h1
                        className={`header-mobileview-title ${
                          trending ? 'title-cng-color' : null
                        }`}
                      >
                        Trending
                      </h1>
                    </Link>
                    <Link to="/gaming" className="mobile-link">
                      <h1
                        className={`header-mobileview-title ${
                          gaming ? 'title-cng-color' : null
                        }`}
                      >
                        Gaming
                      </h1>
                    </Link>
                    <Link to="/saved-videos" className="mobile-link">
                      <h1
                        className={`header-mobileview-title ${
                          saved ? 'title-cng-color' : null
                        }`}
                      >
                        Saved Videos
                      </h1>
                    </Link>
                  </div>
                </div>
                <div className="nav-logos-container">
                  <button
                    type="button"
                    onClick={changeThemeIcon}
                    data-testid="theme"
                    className="header-theme-changer"
                  >
                    {themeChange ? (
                      <RiSunLine
                        className={`nav-lighttheme-logo ${
                          themeChange ? 'headtheme-para-color' : null
                        }`}
                      />
                    ) : (
                      <FaMoon className="nav-lighttheme-logo" />
                    )}
                  </button>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="nav-profile-image"
                  />
                  <button
                    type="button"
                    onClick={onOpenHamburger}
                    className={`nav-mobilebutton-style ${
                      themeChange ? 'head-theme-button' : null
                    }`}
                  >
                    <FaBars className="nav-lighttheme-logo" />
                  </button>
                  <Popup
                    modal
                    trigger={
                      <button
                        type="button"
                        className={`nav-button-style ${
                          themeChange ? 'head-theme-button' : null
                        }`}
                      >
                        LogOut
                      </button>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <div className="pop-div">
                        <p className="popup-title">
                          Are you sure, you want to logout
                        </p>
                        <div className="popup-button-container">
                          <button
                            type="button"
                            className="popup-button"
                            onClick={() => close()}
                          >
                            Cancle
                          </button>
                          <button
                            type="button"
                            onClick={onChangeLogOut}
                            className="popup-button popupbtn1"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                  <Popup
                    modal
                    trigger={
                      <button
                        type="button"
                        onClick={onChangeLogOut}
                        className={`nav-mobilebutton-style ${
                          themeChange ? 'head-theme-button' : null
                        }`}
                      >
                        <FiLogOut className="nav-lighttheme-logo" />
                      </button>
                    }
                    className={`popup-content ${
                      themeChange ? 'dark-theme' : null
                    }`}
                  >
                    {close => (
                      <div className="pop-div">
                        <p className="popup-title">
                          Are you sure, you want to logout
                        </p>
                        <div className="popup-button-container">
                          <button
                            type="button"
                            className="popup-button"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={onChangeLogOut}
                            className="popup-button popupbtn1"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            </nav>
          )
        }}
      </ContextOptions.Consumer>
    )
  }
}
export default withRouter(NavbarHeader)
