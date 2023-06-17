import GamingListItems from '../GamingListItems'
import './index.css'

const GamingSideBarList = props => {
  const {videosList} = props
  return (
    <ul className="rightbar-unordered-list">
      {videosList.map(eachItem => (
        <GamingListItems eachItem={eachItem} key={eachItem.id} />
      ))}
    </ul>
  )
}

export default GamingSideBarList
