import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import NProgress from 'nprogress'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const StyledHeader = styled.header``

class index extends React.Component {
  render () {
    return (
      <StyledHeader>
        <p>Header</p>
      </StyledHeader>
    )
  }
}

export default index
