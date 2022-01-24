import { render, screen } from '@redwoodjs/testing/web'

import Comment from './Comment'

describe('Comment', () => {
  it('renders successfully', () => {
    const comment = {
      name: 'Devinda S',
      body: 'This is a comment',
      createdAt: '2021-01-01T08:00:00.000Z',
    }

    render(<Comment comment={comment} />)

    expect(screen.getByText(comment.name)).toBeInTheDocument()
    expect(screen.getByText(comment.body)).toBeInTheDocument()

    const dateExpect = screen.getByText('1 January 2021')
    expect(dateExpect).toBeInTheDocument()
    expect(dateExpect.nodeName).toEqual('TIME')
    expect(dateExpect).toHaveAttribute('datetime', comment.createdAt)
  })
})
