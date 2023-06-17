import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ContextOptions from '../../ReactContext'
import './index.css'

const SavedVideoDetails = props => (
  <ContextOptions.Consumer>
    {value => {
      const {themeChange} = value
      const {eachItem} = props
      const {
        id,
        publishedAt,
        thumbnailUrl,
        title,
        viewCount,
        channel,
      } = eachItem
      const {name, profileImageUrl} = channel
      const dates = new Date(publishedAt)
      return (
        <Link to={`/videos/${id}`} className="saved-link-style">
          <li className="savedDetailslist-container">
            <div className="saved-container-profile ">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="savedDetailslist-thumbnailimage"
              />
            </div>
            <div className="savedDetailslist-description-container">
              <img
                src={profileImageUrl}
                alt="profile"
                className="mobile-profile"
              />
              <div>
                <p
                  className={`savedDetailslist-item-description ${
                    themeChange ? 'saved-theme-title' : null
                  }`}
                >
                  {title}
                </p>
                <p className="savedDetailslist-name">{name}</p>
                <p className="savedDetailslist-view-para">
                  {viewCount} Views {formatDistanceToNow(dates)} ago
                </p>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </ContextOptions.Consumer>
)
export default SavedVideoDetails
