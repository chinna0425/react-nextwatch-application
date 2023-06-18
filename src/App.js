import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/LoginRoute'
import Home from './components/HomeRoute'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import VideoDetailsRoute from './components/VideoItemDetailsRoute'
import ProtectRoute from './components/ProtectedRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import NotFoundRoute from './components/NotFoundRoute'
import ContextOptions from './ReactContext'
import './App.css'

// Replace your code here
class App extends Component {
  state = {savedVideos: [], lightChange: false, hamburgerIcon: false}

  addToSavedList = videos => {
    const {savedVideos} = this.state
    const filtered = savedVideos.filter(eachSet => videos.id === eachSet.id)
    if (filtered.length === 0) {
      this.setState({savedVideos: [...savedVideos, videos]})
    } else {
      this.setState({savedVideos: [...savedVideos]})
    }
  }

  onLightDarkChange = () => {
    this.setState(prevs => ({lightChange: !prevs.lightChange}))
  }

  onHamBurger = () => {
    this.setState(prevs => ({hamburgerIcon: !prevs.hamburgerIcon}))
  }

  onDeleteVideo = videos => {
    const {savedVideos} = this.state
    const filtered = savedVideos.filter(eachSet => videos.id !== eachSet.id)
    this.setState({savedVideos: [...filtered]})
  }

  render() {
    const {savedVideos, lightChange, hamburgerIcon} = this.state

    return (
      <ContextOptions.Provider
        value={{
          savedList: savedVideos,
          hamBurger: hamburgerIcon,
          themeChange: lightChange,
          addToSavedList: this.addToSavedList,
          onLightDarkChange: this.onLightDarkChange,
          onHamBurger: this.onHamBurger,
          onDeleteVideo: this.onDeleteVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectRoute exact path="/" component={Home} />
          <ProtectRoute exact path="/trending" component={TrendingRoute} />
          <ProtectRoute exact path="/gaming" component={GamingRoute} />
          <ProtectRoute
            exact
            path="/videos/:id"
            component={VideoDetailsRoute}
          />
          <ProtectRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <ProtectRoute path="/not-found" component={NotFoundRoute} />
          <Redirect to="/not-found" />
        </Switch>
      </ContextOptions.Provider>
    )
  }
}

export default App
