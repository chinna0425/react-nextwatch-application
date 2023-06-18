import React from 'react'

const ContextOptions = React.createContext({
  savedList: [],
  themeChange: false,
  hamBurger: false,
  addToSavedList: () => {},
  onLightDarkChange: () => {},
  onHamBurger: () => {},
  onDeleteVideo: () => {},
})
export default ContextOptions
