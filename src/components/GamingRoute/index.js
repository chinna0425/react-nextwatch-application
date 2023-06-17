import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import NavbarHeader from '../Header'
import LeftSideBar from '../LeftSideBar'
import GamingSideBarList from '../GamingSideBarItems'
import ContextOptions from '../../ReactContext'

import './index.css'

const valData = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {starting: valData.initial, videosList: {}}

  componentDidMount() {
    this.getFetchedData()
  }

  getFetchedData = async () => {
    const jwt = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/videos/gaming'
    const fetchData = await fetch(url, options)

    if (fetchData.ok) {
      const fetchres = await fetchData.json()
      const changedData = fetchres.videos.map(eachItem => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({videosList: changedData, starting: valData.success})
    } else {
      this.setState({starting: valData.failure})
    }
  }

  initialSetting = () => (
    <div className="home-loader-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
      </div>
    </div>
  )

  onSuccessData = () => {
    const {videosList} = this.state
    return <GamingSideBarList videosList={videosList} />
  }

  onCheckGaming = () => {
    this.setState({}, this.getFetchedData)
  }

  onFailureData = () => (
    <ContextOptions.Consumer>
      {value => {
        const {themeChange} = value
        return (
          <div className="home-loader-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              className="failure-image"
              alt="failure view"
            />
            <h1
              className={`oops-title ${
                themeChange ? 'gaming-theme-title' : null
              }`}
            >
              Oops! Something Went Wrong
            </h1>
            <p
              className={`oops-para-description ${
                themeChange ? 'gaming-theme-title' : null
              }`}
            >
              We are having some trouble to complete your request.
              <br />
              Please try again.
            </p>
            <button
              type="button"
              onClick={this.onCheckGaming}
              className="reset-button"
            >
              Retry
            </button>
          </div>
        )
      }}
    </ContextOptions.Consumer>
  )

  onGamingData = () => {
    const {starting} = this.state
    switch (starting) {
      case 'INITIAL':
        return this.initialSetting()
      case 'SUCCESS':
        return this.onSuccessData()
      case 'FAILURE':
        return this.onFailureData()
      default:
        return null
    }
  }

  render() {
    const booles = {home: false, trending: false, gaming: true, saved: false}
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
                    className={`gamingright-sidebar ${
                      themeChange ? 'gaming-fire-theme' : null
                    }`}
                  >
                    <div
                      className={`gamingright-sidebar-banner-container ${
                        themeChange ? 'gaming-banner-theme' : null
                      }`}
                    >
                      <div
                        className={`gamingright-fire-container ${
                          themeChange ? 'gaming-fire-theme' : null
                        }`}
                      >
                        <SiYoutubegaming className="right-gaming-fire-logo" />
                      </div>
                      <h1 className="right-gaming-heading">Gaming</h1>
                    </div>
                    {this.onGamingData()}
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
export default Home
