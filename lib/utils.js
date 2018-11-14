import Router from 'next/router'

const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i

function goToLink (p, callback) {
  if (typeof callback === 'function') callback()
  Router.push({
    pathname: '/dashboard',
    query: p ? { p } : null
  })
}

export { EMAIL_REGEX, goToLink }
