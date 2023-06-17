import {Component} from 'react'
import NavbarHeader from '../Header'
import LeftSideBar from '../LeftSideBar'
import ContextOptions from '../../ReactContext'

import './index.css'

class NotFoundRoute extends Component {
  render() {
    const booles = {home: false, trending: false, gaming: false, saved: false}
    return (
      <ContextOptions.Consumer>
        {value => {
          const {themeChange} = value
          return (
            <>
              <NavbarHeader booles={booles} />
              <div className="home-container">
                <div className="home-inner-container">
                  <LeftSideBar booles={booles} />
                  <div
                    className={`notfound-right-sidebar ${
                      themeChange ? 'notfound-theme-change' : null
                    }`}
                  >
                    {themeChange ? (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
                        alt="not found"
                        className="not-found-image"
                      />
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                        alt="not found"
                        className="not-found-image"
                      />
                    )}
                    <h1
                      className={`not-found-title ${
                        themeChange ? 'notfound-theme-title' : null
                      }`}
                    >
                      Page Not Found
                    </h1>
                    <p
                      className={`not-found-desc ${
                        themeChange ? 'notfound-theme-title' : null
                      }`}
                    >
                      we are sorry, the page you requested could not be found.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </ContextOptions.Consumer>
    )
  }
}
export default NotFoundRoute
