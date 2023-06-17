import {Link} from 'react-router-dom'
import ContextOptions from '../../ReactContext'
import './index.css'

const GamingListItems = props => (
  <ContextOptions.Consumer>
    {value => {
      const {themeChange} = value
      const {eachItem} = props
      const {id, thumbnailUrl, title, viewCount} = eachItem
      return (
        <Link to={`/videos/${id}`} className="gaminglinkstyle">
          <li className="gaminglist-container">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="gaminglist-item-thumbnailimage"
            />
            <p
              className={`gaminglist-view-para ${
                themeChange ? 'gaming-theme-title' : null
              }`}
            >
              {title}
            </p>
            <p
              className={`gaminglist-view-para ${
                themeChange ? 'gaming-theme-title' : null
              }`}
            >
              {viewCount} Views
            </p>
          </li>
        </Link>
      )
    }}
  </ContextOptions.Consumer>
)
export default GamingListItems
