import React, { createContext, useState } from 'react'

export const StateContext = createContext()

const StateContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('theme-dark')

  return (
    <StateContext.Provider
      value={{
        theme,
        setTheme
      }}>
      {children}
    </StateContext.Provider>
  )
}

export default StateContextProvider
