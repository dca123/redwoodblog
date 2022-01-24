import Comment from './Comment'

export const defaultView = () => {
  return (
    <div className="m-4">
      <Comment
        comment={{
          name: 'Devinda S',
          body: 'This is a comment',
          createdAt: '2021-01-01T08:00:00.000Z',
        }}
      />
    </div>
  )
}

export const moderatorView = () => {
  mockCurrentUser({
    roles: ['moderator'],
  })
  return (
    <div className="m-4">
      <Comment
        comment={{
          name: 'Devinda S',
          body: 'This is a comment',
          createdAt: '2021-01-01T08:00:00.000Z',
        }}
      />
    </div>
  )
}

export default { title: 'Components/Comment' }
