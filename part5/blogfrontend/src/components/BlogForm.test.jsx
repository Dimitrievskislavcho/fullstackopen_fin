import {
  queryByAttribute,
  queryByText,
  render,
  waitFor,
} from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppContext, { AppContextProvider } from '../AppContext'
import * as handlers from '../services/blogs'
import { useContext } from 'react'

describe('BlogForm', () => {
  test('is calling the right handler on submission', async () => {
    const mockOnCreateBlogHandler = vi.fn()
    const user = userEvent.setup()
    const queryClient = new QueryClient()
    const { container } = render(
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <BlogForm onCreateBlog={mockOnCreateBlogHandler}></BlogForm>
        </QueryClientProvider>
      </AppContextProvider>
    )
    const titleInput = queryByAttribute('name', container, 'Title')
    const authorInput = queryByAttribute('name', container, 'Author')
    const urlInput = queryByAttribute('name', container, 'Url')
    const createBlogButton = queryByText(container, 'create')

    const createBlogSpy = vi.spyOn(handlers, 'createBlog')
    createBlogSpy.mockImplementationOnce((newBlog) => {
      return Promise.resolve({ ...newBlog, id: 1, a: 'a' })
    })

    await user.type(titleInput, 'Test title')
    await user.type(authorInput, 'Test author')
    await user.type(urlInput, 'http://testurl.org')
    await user.click(createBlogButton)

    expect(createBlogSpy.mock.calls.length).toEqual(1)
  })

  afterEach(() => vi.clearAllMocks())
})
