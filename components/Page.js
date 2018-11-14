import React, { Component } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { SheetsRegistry } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Meta from './Meta'
import Header from './Header'
import Snack from './Snack'

const theme = {
  primary: '#3f51b5',
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  snackSuccess: '#43a047',
  snackInfo: '#1976d2',
  snackWarning: '#ffa000',
  snackError: '#d32f2f',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  headerHeight: '64px',
  spacingUnit: '8px',
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px'
  }
}

// Temporary : Migration to typography v2
const muiTheme = createMuiTheme({
  typography: { useNextVariants: true }
})

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
  main {
    position: absolute;
    width: 100%;
    margin-top: ${props => props.theme.headerHeight};
  }
`

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`

// Create a sheetsRegistry instance.
const sheetsRegistry = new SheetsRegistry()

// Create a sheetsManager instance.
const sheetsManager = new Map()

// Create a new class name generator.
const generateClassName = createGenerateClassName()

class Page extends Component {
  render () {
    return (
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={muiTheme} sheetsManager={sheetsManager}>
          <ThemeProvider theme={theme}>
            <StyledPage>
              <CssBaseline />
              <GlobalStyle />
              <Meta />
              <Header {...this.props} />
              <Snack />
              <main role='main'>{this.props.children}</main>
            </StyledPage>
          </ThemeProvider>
        </MuiThemeProvider>
      </JssProvider>
    )
  }
}

export default Page
