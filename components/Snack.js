import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'styled-components'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'

const LOCAL_STATE_QUERY = gql`
  query {
    snackOpen @client
    snackMsg @client
    snackVariant @client
  }
`

const SHOW_SNACK_MUTATION = gql`
  mutation showSnack($msg: String!, $variant: String) {
    showSnack(msg: $msg, variant: $variant) @client
  }
`

const HIDE_SNACK_MUTATION = gql`
  mutation {
    hideSnack @client
  }
`

const Composed = adopt({
  hideSnack: ({ render }) => (
    <Mutation mutation={HIDE_SNACK_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
})

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const StyledSnack = styled.div`
  .success {
    background: ${props => props.theme.snackSuccess};
  }
  .info {
    background: ${props => props.theme.snackInfo};
  }
  .warning {
    background: ${props => props.theme.snackWarning};
  }
  .error {
    background: ${props => props.theme.snackError};
  }
  .icon {
    font-size: 20px;
  }
  .iconVariant {
    opacity: 0.9;
    margin-right: ${props => props.theme.spacingUnit};
  }
  .message {
    display: flex;
    align-items: center;
  }
`

class Snack extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    vertical: PropTypes.string,
    horizontal: PropTypes.string
  }

  state = {
    vertical: 'top',
    horizontal: 'center'
  }

  componentDidMount () {
    const { vertical, horizontal } = this.props
    if (vertical && horizontal) {
      this.setState({ vertical, horizontal })
    }
  }

  render () {
    const { className, ...other } = this.props
    const { vertical, horizontal } = this.state

    return (
      <Composed>
        {({ hideSnack, localState }) => {
          const variant = localState.data.snackVariant
          const Icon = variantIcon[variant]
          return (
            <StyledSnack>
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={localState.data.snackOpen}
                autoHideDuration={6000}
                onClose={(e, reason) => {
                  if (reason === 'clickway') return
                  hideSnack()
                }}
              >
                <SnackbarContent
                  className={classNames(variant, className)}
                  aria-describedby='client-snackbar'
                  message={
                    <span id='client-snackbar' className='message'>
                      <Icon className={classNames('icon', 'iconVariant')} />
                      {localState.data.snackMsg}
                    </span>
                  }
                  action={[
                    <IconButton
                      key='close'
                      aria-label='Close'
                      color='inherit'
                      className='close'
                      onClick={hideSnack}
                    >
                      <CloseIcon className='icon' />
                    </IconButton>
                  ]}
                  {...other}
                />
              </Snackbar>
            </StyledSnack>
          )
        }}
      </Composed>
    )
  }
}

export default Snack
export { LOCAL_STATE_QUERY, SHOW_SNACK_MUTATION, HIDE_SNACK_MUTATION }
