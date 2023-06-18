import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import NavbarHeader from '../Header'
import LeftSideBar from '../LeftSideBar'
import ContextOptions from '../../ReactContext'

import './index.css'

const valData = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoDetailsRoute extends Component {
  state = {
    starting: valData.initial,
    like: false,
    dislike: false,
    saved: false,
    videosList: {},
  }

  componentDidMount() {
    this.getFetchedData()
  }

  getFetchedData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwt = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/videos/${id}`
    const fetchData = await fetch(url, options)
    if (fetchData.ok) {
      const fetchres = await fetchData.json()
      const videos = {videoDetails: fetchres.video_details}
      const {videoDetails} = videos
      const convertedData = {
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
          subscriberCount: videoDetails.channel.subscriber_count,
        },
        description: videoDetails.description,
        id: videoDetails.id,
        publishedAt: videoDetails.published_at,
        title: videoDetails.title,
        thumbnailUrl: videoDetails.thumbnail_url,
        videoUrl: videoDetails.video_url,
        viewCount: videoDetails.view_count,
      }
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

  onSuccessData = () => (
    <ContextOptions.Consumer>
      {value => {
        const {videosList, like, dislike, saved} = this.state
        const {
          channel,
          description,
          title,
          publishedAt,
          videoUrl,
          viewCount,
        } = videosList
        const {addToSavedList, themeChange, onDeleteVideo} = value
        const {name, profileImageUrl, subscriberCount} = channel
        const onLikeButton = () => {
          this.setState(prev => ({like: !prev.like, dislike: false}))
        }

        const onDislikeButton = () => {
          this.setState(prev => ({dislike: !prev.dislike, like: false}))
        }

        const onSavedList = () => {
          if (saved === false) {
            this.setState(prev => ({
              dislike: false,
              like: !prev.like,
              saved: !prev.saved,
            }))
            addToSavedList(videosList)
          } else {
            this.setState(prev => ({
              dislike: false,
              like: !prev.like,
              saved: !prev.saved,
            }))
            onDeleteVideo(videosList)
          }
        }
        return (
          <div className="videoItem-container">
            <div className="video-height-contianer">
              <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
            </div>
            <h2
              className={`video-title-style ${
                themeChange ? 'video-theme-color' : null
              }`}
            >
              {title}
            </h2>
            <div className="video-first-main-container">
              <p className="video-views-count-para">
                {viewCount} views {formatDistanceToNow(new Date(publishedAt))}{' '}
                ago
              </p>
              <div className="video-main-icon-container">
                <button
                  type="button"
                  onClick={onLikeButton}
                  className="video-div-items-align video-mobile-icon"
                >
                  <BiLike
                    className={`video-icon-style  ${
                      themeChange ? 'video-theme-color' : null
                    } ${like ? 'like-color' : null} `}
                  />
                  <p
                    className={`video-icon-para ${
                      themeChange ? 'video-theme-color' : null
                    } ${like ? 'like-color' : null}`}
                  >
                    Like
                  </p>
                </button>
                <button
                  type="button"
                  onClick={onDislikeButton}
                  className="video-div-items-align"
                >
                  <BiDislike
                    className={`video-icon-style ${
                      themeChange ? 'video-theme-color' : null
                    } ${dislike ? 'like-color' : null}`}
                  />
                  <p
                    className={`video-icon-para ${
                      themeChange ? 'video-theme-color' : null
                    } ${dislike ? 'like-color' : null}`}
                  >
                    Dislike
                  </p>
                </button>
                <button
                  type="button"
                  onClick={onSavedList}
                  className="video-div-items-align"
                >
                  <MdPlaylistAdd
                    className={`video-icon-style ${
                      themeChange ? 'video-theme-color' : null
                    } ${saved ? 'like-color' : null} `}
                  />
                  <p
                    className={`video-icon-para ${
                      themeChange ? 'video-theme-color' : null
                    } ${saved ? 'like-color' : null}`}
                  >
                    {saved ? 'Saved' : 'Save'}
                  </p>
                </button>
              </div>
            </div>
            <hr className="video-horizontal-line" />
            <div className="profile-and-description-container">
              <div className="video-profile-container">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="video-profile-design"
                />
              </div>
              <div>
                <h3
                  className={`video-name-section ${
                    themeChange ? 'video-theme-color' : null
                  }`}
                >
                  {name}
                </h3>
                <p className="video-views-count-para">
                  {subscriberCount} Subscribers
                </p>
                <p
                  className={`video-description-style mobile-hide-para ${
                    themeChange ? 'video-theme-color' : null
                  }`}
                >
                  {description}
                </p>
              </div>
            </div>
            <p
              className={`video-description-style laptop-hide-para ${
                themeChange ? 'video-theme-color' : null
              }`}
            >
              {description}
            </p>
          </div>
        )
      }}
    </ContextOptions.Consumer>
  )

  onFailureData = () => (
    <div className="home-loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="oops-title">Oops! Something Went Wrong</h1>
      <p className="oops-para-description">
        We are having some trouble to complete your request.
        <br />
        Please try again.
      </p>
      <button type="button" className="reset-button">
        Retry
      </button>
    </div>
  )

  onVideoItemsFetch = () => {
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
    const booles = {home: false, trending: false, gaming: false, saved: false}
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
                    className={`videoright-sidebar ${
                      themeChange ? 'video-container-theme' : null
                    }`}
                  >
                    {this.onVideoItemsFetch()}
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
export default VideoDetailsRoute
