import React, { useContext, useEffect } from 'react'
import { HTML } from 'drei'
import { StateContext } from './StateContext'

const Content = ({ children, portal }) => {
  /*const { theme, setTheme } = useContext(StateContext)

  useEffect(() => {
    console.log('TestInsideCanvas', theme)
  }, [theme])

  const changeTheme = () => {
    theme === 'theme-dark' ? setTheme('theme-light') : setTheme('theme-dark')
  }
*/
  return (
    <HTML fullscreen portal={portal}>
      {children}
    </HTML>
  )
}

export default Content
