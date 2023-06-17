import TrendingListItems from '../TrendingListItems'
import './index.css'

const TrendingRightBarList = props => {
  const {videosList} = props
  return (
    <ul className="trendingrightbar-unordered-list">
      {videosList.map(eachItem => (
        <TrendingListItems eachItem={eachItem} key={eachItem.id} />
      ))}
    </ul>
  )
}

export default TrendingRightBarList
