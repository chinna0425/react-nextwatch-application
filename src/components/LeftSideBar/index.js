import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import ContextOptions from '../../ReactContext'
import './index.css'

class LeftSideBar extends Component {
  render() {
    const {booles} = this.props
    const {home, gaming, trending, saved} = booles

    return (
      <ContextOptions.Consumer>
        {value => {
          const {themeChange} = value
          return (
            <div
              className={`left-sidebar ${
                themeChange ? 'left-sidebar-theme' : null
              }`}
            >
              <div className="home-flex-icons-container">
                <Link to="/" className="home-link-style">
                  <button
                    type="button"
                    className={`home-icons-container ${
                      home ? 'home-back' : null
                    }`}
                  >
                    <AiFillHome
                      className={`home-icons-styles ${
                        themeChange ? 'theme-para-color' : null
                      } ${home ? 'home-icon' : null} `}
                    />
                    <h2
                      className={`home-icons-title ${
                        themeChange ? 'theme-para-color' : null
                      } ${home ? 'home-button-nav' : null}`}
                    >
                      Home
                    </h2>
                  </button>
                </Link>
                <Link to="/trending" className="home-link-style">
                  <button
                    type="button"
                    className={`home-icons-container ${
                      trending ? 'home-back' : null
                    }`}
                  >
                    <HiFire
                      className={`home-icons-styles ${
                        trending ? 'home-icon' : null
                      } ${themeChange ? 'theme-para-color' : null} `}
                    />
                    <h2
                      className={`home-icons-title ${
                        themeChange ? 'theme-para-color' : null
                      } ${trending ? 'home-button-nav' : null}`}
                    >
                      Trending
                    </h2>
                  </button>
                </Link>
                <Link to="/gaming" className="home-link-style">
                  <button
                    type="button"
                    className={`home-icons-container ${
                      gaming ? 'home-back' : null
                    }`}
                  >
                    <SiYoutubegaming
                      className={`home-icons-styles ${
                        themeChange ? 'theme-para-color' : null
                      } ${gaming ? 'home-icon' : null}`}
                    />
                    <h2
                      className={`home-icons-title ${
                        themeChange ? 'theme-para-color' : null
                      } ${gaming ? 'home-button-nav' : null}`}
                    >
                      Gaming
                    </h2>
                  </button>
                </Link>
                <Link to="/saved-videos" className="home-link-style">
                  <button
                    type="button"
                    className={`home-icons-container ${
                      saved ? 'home-back' : null
                    }`}
                  >
                    <MdPlaylistAdd
                      className={`home-icons-styles ${
                        themeChange ? 'theme-para-color' : null
                      } ${saved ? 'home-icon' : null}`}
                    />
                    <h2
                      className={`home-icons-title ${
                        themeChange ? 'theme-para-color' : null
                      } ${saved ? 'home-button-nav' : null}`}
                    >
                      Saved videos
                    </h2>
                  </button>
                </Link>
              </div>
              <div className="home-main-contactus-container">
                <h1
                  className={`home-contact-title ${
                    themeChange ? 'theme-para-color' : null
                  }`}
                >
                  CONTACT US
                </h1>
                <div className="home-contact-log-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="home-contact-logos log-margin"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="home-contact-logos log-margin"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="home-contact-logos"
                  />
                </div>
                <p
                  className={`home-contact-description ${
                    themeChange ? 'theme-para-color' : null
                  }`}
                >
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </ContextOptions.Consumer>
    )
  }
}
export default LeftSideBar

/*
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import ContextOptions from '../../ReactContext'
import './index.css'

class LeftSideBar extends Component {
  render() {
    const {booles} = this.props
    const {home, gaming, trending, saved} = booles

    return (
      <ContextOptions.Consumer>
        {value => {
          const {themeChange} = value
          return (
            <div
              className={`left-sidebar ${
                themeChange ? 'left-sidebar-theme' : null
              }`}
            >
              <div className="home-flex-icons-container">
                <Link to="/" className="home-link-style">
                  <AiFillHome
                    className={`home-icons-styles ${
                      themeChange ? 'theme-para-color' : null
                    } ${home ? 'home-icon' : null} `}
                  />
                  Home
                </Link>
                <Link to="/trending" className="home-link-style">
                  <HiFire
                    className={`home-icons-styles ${
                      trending ? 'home-icon' : null
                    } ${themeChange ? 'theme-para-color' : null} `}
                  />
                  Trending
                </Link>
                <Link to="/gaming" className="home-link-style">
                  <SiYoutubegaming
                    className={`home-icons-styles ${
                      themeChange ? 'theme-para-color' : null
                    } ${gaming ? 'home-icon' : null}`}
                  />
                  Gaming
                </Link>
                <Link to="/saved-videos" className="home-link-style">
                  <MdPlaylistAdd
                    className={`home-icons-styles ${
                      themeChange ? 'theme-para-color' : null
                    } ${saved ? 'home-icon' : null}`}
                  />
                  Saved videos
                </Link>
              </div>
              <div className="home-main-contactus-container">
                <p
                  className={`home-contact-title ${
                    themeChange ? 'theme-para-color' : null
                  }`}
                >
                  CONTACT US
                </p>
                <div className="home-contact-log-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="home-contact-logos log-margin"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="home-contact-logos log-margin"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="home-contact-logos"
                  />
                </div>
                <p
                  className={`home-contact-description ${
                    themeChange ? 'theme-para-color' : null
                  }`}
                >
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </ContextOptions.Consumer>
    )
  }
}
export default LeftSideBar

/* <Link to="/" className="home-link-style">
                  <button
                    type="button"
                    className={`home-icons-container ${
                      home ? 'home-back' : null
                    }`}
                  >
                    <AiFillHome
                      className={`home-icons-styles ${
                        themeChange ? 'theme-para-color' : null
                      } ${home ? 'home-icon' : null} `}
                    />
                    <h2
                      className={`home-icons-title ${
                        themeChange ? 'theme-para-color' : null
                      } ${home ? 'home-button-nav' : null}`}
                    >
                      Home
                    </h2>
                  </button>
                </Link>
                <Link to="/trending" className="home-link-style">
                  <button
                    type="button"
                    className={`home-icons-container ${
                      trending ? 'home-back' : null
                    }`}
                  >
                    <HiFire
                      className={`home-icons-styles ${
                        trending ? 'home-icon' : null
                      } ${themeChange ? 'theme-para-color' : null} `}
                    />
                    <h2
                      className={`home-icons-title ${
                        themeChange ? 'theme-para-color' : null
                      } ${trending ? 'home-button-nav' : null}`}
                    >
                      Trending
                    </h2>
                  </button>
                </Link>
                <Link to="/gaming" className="home-link-style">
                  <button
                    type="button"
                    className={`home-icons-container ${
                      gaming ? 'home-back' : null
                    }`}
                  >
                    <SiYoutubegaming
                      className={`home-icons-styles ${
                        themeChange ? 'theme-para-color' : null
                      } ${gaming ? 'home-icon' : null}`}
                    />
                    <h2
                      className={`home-icons-title ${
                        themeChange ? 'theme-para-color' : null
                      } ${gaming ? 'home-button-nav' : null}`}
                    >
                      Gaming
                    </h2>
                  </button>
                </Link>
                <Link to="/saved-videos" className="home-link-style">
                  <button
                    type="button"
                    className={`home-icons-container ${
                      saved ? 'home-back' : null
                    }`}
                  >
                    <MdPlaylistAdd
                      className={`home-icons-styles ${
                        themeChange ? 'theme-para-color' : null
                      } ${saved ? 'home-icon' : null}`}
                    />
                    <h2
                      className={`home-icons-title ${
                        themeChange ? 'theme-para-color' : null
                      } ${saved ? 'home-button-nav' : null}`}
                    >
                      Saved videos
                    </h2>
                  </button>
                </Link>  */
