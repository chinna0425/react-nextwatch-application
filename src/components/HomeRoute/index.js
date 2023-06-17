import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineClose} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import NavbarHeader from '../Header'
import LeftSideBar from '../LeftSideBar'
import RightSideBarList from '../RightSideBarData'
import ContextOptions from '../../ReactContext'

import './index.css'

const valData = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {starting: valData.initial, searchItem: '', videosList: {}}

  componentDidMount() {
    this.getFetchedData()
  }

  getFetchedData = async () => {
    const {searchItem} = this.state
    const jwt = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/videos/all?search=${searchItem.toLowerCase()}`
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

  onNoDataFound = () => (
    <ContextOptions.Consumer>
      {value => {
        const {themeChange} = value
        return (
          <div className="no-datafound-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="no-datafound-image-setting"
            />
            <h1
              className={`no-datafound-title ${
                themeChange ? 'home-theme-title' : null
              }`}
            >
              No Search Results Found
            </h1>
            <p className="no-datafound-description">
              Try Different Key Words or remove search filter
            </p>
            <button
              type="button"
              onClick={this.onRetryChange}
              className="reset-button"
            >
              Retry
            </button>
          </div>
        )
      }}
    </ContextOptions.Consumer>
  )

  onSuccessData = () => {
    const {videosList} = this.state
    const videosLength = videosList.length

    return videosLength > 0 ? (
      <RightSideBarList videosList={videosList} />
    ) : (
      this.onNoDataFound()
    )
  }

  onRetryChange = () => {
    this.setState(prev => ({searchItem: prev.searchItem}), this.getFetchedData)
  }

  onRetryChangeHome = () => {
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
                themeChange ? 'home-theme-title' : null
              }`}
            >
              Oops! Something Went Wrong
            </h1>
            <p
              className={`oops-para-description ${
                themeChange ? 'home-theme-title' : null
              }`}
            >
              We are having some trouble to complete your request.
              <br />
              Please try again.
            </p>
            <button
              type="button"
              onClick={this.onRetryChangeHome}
              className="reset-button"
            >
              Retry
            </button>
          </div>
        )
      }}
    </ContextOptions.Consumer>
  )

  onItemsFetch = () => {
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

  onChangeSearch = event => {
    this.setState({searchItem: event.target.value})
  }

  onChangeKeyDown = event => {
    if (event.key === 'Enter') {
      this.setState({searchItem: event.target.value}, this.getFetchedData)
    }
  }

  render() {
    const {searchItem} = this.state
    const booles = {home: true, trending: false, gaming: false, saved: false}
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
                    className={`right-sidebar ${
                      themeChange ? 'homeright-sidebar-theme' : null
                    }`}
                  >
                    <div
                      className="right-sidebar-banner-container"
                      data-testid="banner"
                    >
                      <div className="right-sidebar-description-container">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="website logo"
                          className="home-right-logo"
                        />
                        <p className="right-para-description">
                          Buy Nxt Watch Premium prepaid plans with <br /> UPI
                        </p>
                        <button type="button" className="right-sidebar-button">
                          GET IT NOW
                        </button>
                      </div>
                      <AiOutlineClose
                        className="right-sidebar-crosslogo"
                        data-testid="close"
                      />
                    </div>
                    <div className="home-items-search-container">
                      <div className="home-right-main-searchcontainer">
                        <div
                          className="search-design-container"
                          data-testid="searchButton"
                        >
                          <input
                            type="search"
                            placeholder="Search"
                            value={searchItem}
                            onKeyDown={this.onChangeKeyDown}
                            onChange={this.onChangeSearch}
                            className="search-input-design"
                          />
                          <div className="search-logo-container">
                            <BsSearch className="home-right-search-logo" />
                          </div>
                        </div>
                      </div>
                      {this.onItemsFetch()}
                    </div>
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
