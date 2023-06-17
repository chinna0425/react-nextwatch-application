import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ContextObjects from '../../ReactContext'

import './index.css'

const ListItems = props => (
  <ContextObjects.Consumer>
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
      const {profileImageUrl, name} = channel
      const dates = new Date(publishedAt)
      return (
        <Link to={`/videos/${id}`} className="home-link-items">
          <li className="list-container">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="list-item-thumbnailimage"
            />
            <div className="list-profile-container">
              <div className="profile-align">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="list-item-profile-image"
                />
              </div>
              <div>
                <p
                  className={`list-item-description ${
                    themeChange ? 'list-theme-desc' : null
                  }`}
                >
                  {title}
                </p>
                <p className="name-style">{name}</p>
                <div className="counts-container">
                  <p className="list-view-para">{viewCount} Views</p>
                  <p className="list-view-para">
                    {formatDistanceToNow(dates)} ago
                  </p>
                </div>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </ContextObjects.Consumer>
)
export default ListItems
