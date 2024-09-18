import {
  getByRole,
  queryAllByAttribute,
  queryAllByRole,
  queryByAttribute,
  queryByRole,
  queryByText,
  render,
  screen,
} from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'

describe('BlogForm', () => {
  test('is calling the right handler on submission', async () => {
    const mockOnCreateBlogHandler = vi.fn()
    const user = userEvent.setup()
    const { container } = render(
      <BlogForm onCreateBlog={mockOnCreateBlogHandler}></BlogForm>
    )
    const titleInput = queryByAttribute('name', container, 'Title')
    const authorInput = queryByAttribute('name', container, 'Author')
    const urlInput = queryByAttribute('name', container, 'Url')
    const createBlogButton = queryByText(container, 'create')

    await user.type(titleInput, 'Test title')
    await user.type(authorInput, 'Test author')
    await user.type(urlInput, 'http://testurl.org')
    await user.click(createBlogButton)

    expect(mockOnCreateBlogHandler.mock.calls).toHaveLength(1)
  })
})
