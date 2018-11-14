import casual from 'casual'

// seed it so we get consistent results
casual.seed(777)

const fakeUser = () => ({
  __typename: 'User',
  id: '1234',
  name: casual.name,
  email: casual.email,
  gravatar: 'https://gravatar.com/avatar/<id here>',
  photo: 'photo.jpg',
  valid: false,
  membership: 'FREE',
  permissions: ['USER']
})

export { fakeUser }
