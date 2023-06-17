import {MdPlaylistAdd} from 'react-icons/md'
import NavbarHeader from '../Header'
import LeftSideBar from '../LeftSideBar'
import SavedVideoDetails from '../SavedVideoItemDetails'
import ContextOptions from '../../ReactContext'

import './index.css'

const SavedVideosRoute = () => (
  <ContextOptions.Consumer>
    {value => {
      const {savedList, themeChange} = value
      const savedLength = savedList.length
      const onShowSavedData = () => (
        <ul className="savedroute-unorder">
          {savedList.map(eachItem => (
            <SavedVideoDetails eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      )
      const onShowNoData = () => (
        <div
          className={`no-saved-container ${
            themeChange ? 'saved-fire-theme' : null
          }`}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
            className="no-saved-image-setting"
          />
          <h1
            className={`no-saved-title ${
              themeChange ? 'saved-theme-title' : null
            }`}
          >
            No saved videos found
          </h1>
          <p className="no-saved-description">
            Save your videos by clicking a button
          </p>
        </div>
      )

      const booles = {home: false, trending: false, gaming: false, saved: true}
      return (
        <>
          <NavbarHeader booles={booles} />
          <div className="home-container">
            <div className="home-inner-container">
              <LeftSideBar booles={booles} />
              <div
                className={`savedright-sidebar ${
                  themeChange ? 'saved-fire-theme' : null
                }`}
              >
                <div
                  className={`savedright-sidebar-banner-container ${
                    themeChange ? 'saved-banner-theme' : null
                  }`}
                >
                  <div
                    className={`savedright-fire-container ${
                      themeChange ? 'saved-fire-theme' : null
                    }`}
                  >
                    <MdPlaylistAdd className="right-saved-fire-logo" />
                  </div>
                  <h1 className="right-saved-heading">Saved Videos</h1>
                </div>
                {savedLength > 0 ? onShowSavedData() : onShowNoData()}
              </div>
            </div>
          </div>
        </>
      )
    }}
  </ContextOptions.Consumer>
)

export default SavedVideosRoute
