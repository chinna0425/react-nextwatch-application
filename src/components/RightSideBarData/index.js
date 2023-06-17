import ListItems from '../ListItems'
import './index.css'

const RightSideBarList = props => {
  const {videosList} = props
  return (
    <ul className="rightbar-unordered-list">
      {videosList.map(eachItem => (
        <ListItems eachItem={eachItem} key={eachItem.id} />
      ))}
    </ul>
  )
}

export default RightSideBarList
