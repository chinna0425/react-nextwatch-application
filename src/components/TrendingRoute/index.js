import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import NavbarHeader from '../Header'
import LeftSideBar from '../LeftSideBar'
import TrendingRightBarList from '../TrendingSideBarItems'
import ContextOptions from '../../ReactContext'

import './index.css'

const valData = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingRoute extends Component {
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
    const url = 'https://apis.ccbp.in/videos/trending'
    const fetchData = await fetch(url, options)

    if (fetchData.ok) {
      const fetchres = await fetchData.json()
      const convertedData = fetchres.videos.map(eachItem => ({
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))

      this.setState({videosList: convertedData, starting: valData.success})
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
    return <TrendingRightBarList videosList={videosList} />
  }

  onTrendRetry = () => {
    this.setState({}.this.getFetchedData)
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
                themeChange ? 'trending-theme-title' : null
              }`}
            >
              Oops! Something Went Wrong
            </h1>
            <p
              className={`oops-para-description ${
                themeChange ? 'trending-theme-title' : null
              }`}
            >
              We are having some trouble to complete your request.
              <br />
              Please try again.
            </p>
            <button
              type="button"
              onClick={this.onTrendRetry}
              className="reset-button"
            >
              Retry
            </button>
          </div>
        )
      }}
    </ContextOptions.Consumer>
  )

  onTrendingData = () => {
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
    const booles = {home: false, trending: true, gaming: false, saved: false}
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
                    className={`trendingright-sidebar ${
                      themeChange ? 'trending-fire-theme' : null
                    }`}
                  >
                    <div
                      className={`trendingright-sidebar-banner-container ${
                        themeChange ? 'trending-banner-theme' : null
                      }`}
                    >
                      <div
                        className={`trendingright-fire-container ${
                          themeChange ? 'trending-fire-theme' : null
                        }`}
                      >
                        <HiFire className="right-trending-fire-logo" />
                      </div>
                      <h1 className="right-trending-heading">Trending</h1>
                    </div>
                    {this.onTrendingData()}
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
export default TrendingRoute
