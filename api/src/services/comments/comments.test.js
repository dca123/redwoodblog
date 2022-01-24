import {
  ForbiddenError,
  RedwoodGraphQLError,
  AuthenticationError,
} from '@redwoodjs/graphql-server'
import { comments, createComment, deleteComment } from './comments'

describe('comments', () => {
  scenario(
    'returns all comments for a single post from the databse',
    async (scenario) => {
      const result = await comments({ postId: scenario.comment.jane.postId })

      expect(result.length).toEqual(1)
    }
  )
  scenario('postOnly', 'creates a new comment', async (scenario) => {
    const comment = await createComment({
      input: {
        name: 'Billy Bob',
        body: 'What is your favorite tree bark ?',
        postId: scenario.post.bark.id,
      },
    })

    expect(comment.name).toEqual('Billy Bob')
    expect(comment.body).toEqual('What is your favorite tree bark ?')
    expect(comment.postId).toEqual(scenario.post.bark.id)
    expect(comment.createdAt).not.toEqual(null)
  })
  scenario('non moderator does not delete a comment', async (scenario) => {
    mockCurrentUser({ roles: [''] })
    // const comment =
    expect(
      async () =>
        await deleteComment({
          id: scenario.comment.jane.id,
        })
    ).rejects.toThrow("You don't have access to do that.")

    const result = await comments({ postId: scenario.comment.jane.id })
    expect(result.length).toEqual(1)
  })
  scenario('delets a comment', async (scenario) => {
    mockCurrentUser({ roles: ['moderator'] })
    const comment = await deleteComment({
      id: scenario.comment.jane.id,
    })
    expect(comment.id).toEqual(scenario.comment.jane.id)

    const result = await comments({ postId: scenario.comment.jane.id })
    expect(result.length).toEqual(0)
  })
})
