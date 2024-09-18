import { queryByText, render } from '@testing-library/react'
import { beforeEach, expect, vi } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog', () => {
  let container
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'http:testurl.net',
    likes: 200,
    user: { name: 'Test user name' },
  }

  beforeEach(() => {
    const { container: renderedContainer } = render(<Blog blog={blog}></Blog>)
    container = renderedContainer
  })

  test('is showing default values, the title and author only', () => {
    expect(queryByText(container, blog.title, { exact: false })).not.toBeNull()
    expect(queryByText(container, blog.author, { exact: false })).not.toBeNull()
    expect(queryByText(container, blog.url, { exact: false })).toBeNull()
    expect(
      queryByText(container, `likes: ${blog.likes}`, { exact: false })
    ).toBeNull()
  })

  test("is showing all values when the button with text 'show' is clicked", async () => {
    const user = userEvent.setup()
    const toggleDetailsButton = queryByText(container, 'show')

    await user.click(toggleDetailsButton)

    expect(queryByText(container, blog.url, { exact: false })).not.toBeNull()
    expect(
      queryByText(container, `likes: ${blog.likes}`, { exact: false })
    ).not.toBeNull()
  })

  test('is correctly invoking the handler for likes', async () => {
    const mockOnBlogLikeHandler = vi.fn()
    const { container: specificContainer } = render(
      <Blog blog={blog} onBlogLike={mockOnBlogLikeHandler}></Blog>
    )
    const user = userEvent.setup()
    const toggleDetailsButton = queryByText(specificContainer, 'show')

    await user.click(toggleDetailsButton)

    const likeButton = queryByText(specificContainer, 'like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockOnBlogLikeHandler.mock.calls).toHaveLength(2)
  })
})
