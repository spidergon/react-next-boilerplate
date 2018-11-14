import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import CURRENT_USER_QUERY from '../gql/current_user_query.gql'

const User = props => <>{props.children(props.data)}</>

User.propTypes = { children: PropTypes.func.isRequired }

export default graphql(CURRENT_USER_QUERY)(User)
