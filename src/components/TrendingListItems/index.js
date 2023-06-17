import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import ContextOptions from '../../ReactContext'
import './index.css'

const TrendingListItems = props => (
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
        <Link to={`/videos/${id}`} className="trending-link-style">
          <li className="trendingList-container">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="trendingList-thumbnailProfile"
            />
            <div className="thumbnail-profile-desc-contianer">
              <img
                src={profileImageUrl}
                alt="profile"
                className="profile-trend"
              />
              <div className="trendingList-description-container">
                <p
                  className={`trendingList-item-description ${
                    themeChange ? 'trending-theme-title' : null
                  }`}
                >
                  {title}
                </p>

                <div className="desktop-name-viewsCount">
                  <p className="trendingList-name">{name}</p>
                  <BsDot
                    className={`mobile-dot-color addc1 ${
                      themeChange ? 'trending-theme-title' : null
                    }`}
                  />
                  <div className="desktop-viewsCount">
                    <p className="trendingList-view-para">{viewCount} Views</p>
                    <BsDot
                      className={`mobile-dot-color addc ${
                        themeChange ? 'trending-theme-title' : null
                      }`}
                    />
                    <p className="trendingList-view-para">
                      {formatDistanceToNow(dates)} ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </ContextOptions.Consumer>
)
export default TrendingListItems
