const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, assertLoginPageContent } = require('../test-utils/login.util')
const { createBlog } = require('../test-utils/blogs.util')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/purgedata')
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'testuser',
        password: 'testpass',
        name: 'John Doe',
      },
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await assertLoginPageContent(page)
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, { username: 'testuser', password: 'testpass' })

      await expect(page.getByText('blogs')).toBeVisible()
      await expect(page.getByText('John Doe logged in')).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, { username: 'testuser', password: 'wrongpass' })

      await assertLoginPageContent(page)
      await expect(page.locator('.notification.error')).toBeVisible()
      await page.waitForTimeout(5100)
      await expect(page.locator('.notification.error')).not.toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await login(page, { username: 'testuser', password: 'testpass' })
      })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, {
          title: 'Test title',
          author: 'Test author',
          url: 'http://testurl.org',
        })

        await page
          .getByText('a new blog Test title! by Test author added')
          .waitFor()
        await page.waitForTimeout(5100)
        await expect(
          page.getByText('a new blog Test title! by Test author added')
        ).not.toBeVisible()
        await expect(
          page
            .getByText('Test title Test author')
            .getByRole('button', { name: 'show' })
        ).toBeVisible()
      })

      test('a blog can be liked', async ({ page }) => {
        await createBlog(page, {
          title: 'Test title',
          author: 'Test author',
          url: 'http://testurl.org',
        })

        const blogText = await page.getByText('Test title Test author')
        const blogShowDetailsButton = await blogText.getByRole('button', {
          name: 'show',
        })

        await blogShowDetailsButton.click()

        await blogText
          .locator('..')
          .getByText('likes: 0')
          .getByRole('button', { name: 'like' })
          .click()

        await expect(blogText.locator('..').getByText('likes: 1')).toBeVisible()
      })

      test('a blog can be deleted', async ({ page }) => {
        await createBlog(page, {
          title: 'Test title',
          author: 'Test author',
          url: 'http://testurl.org',
        })

        const blogText = await page.getByText('Test title Test author')
        const blogShowDetailsButton = await blogText.getByRole('button', {
          name: 'show',
        })

        await blogShowDetailsButton.click()

        page.on('dialog', (dialog) => dialog.accept())

        await blogText
          .locator('..')
          .getByRole('button', { name: 'delete' })
          .click()

        await expect(page.getByText('Test title Test author')).not.toBeVisible()
      })

      test('a blog cannot be deleted by a user who did not create the blog in the first place', async ({
        page,
        request,
      }) => {
        await createBlog(page, {
          title: 'Test title',
          author: 'Test author',
          url: 'http://testurl.org',
        })

        await page.getByRole('button', { name: 'logout' }).click()
        await assertLoginPageContent(page)

        const userWhoCannotDeleteABlog = {
          username: 'luser',
          password: 'testpass2',
          user: 'No Doe',
        }

        await request.post('http://localhost:3001/api/users', {
          data: userWhoCannotDeleteABlog,
        })
        await login(page, userWhoCannotDeleteABlog)

        const blogText = await page.getByText('Test title Test author')
        const blogShowDetailsButton = await blogText.getByRole('button', {
          name: 'show',
        })

        await blogShowDetailsButton.click()

        await expect(
          blogText.locator('..').getByRole('button', { name: 'delete' })
        ).not.toBeVisible()
      })

      test('blogs are shown in the descending order related to the blog likes', async ({
        page,
      }) => {
        await createBlog(page, {
          title: 'Blog with zero likes',
          author: 'Author 1',
          url: 'http://testurl1.org',
        })
        await createBlog(page, {
          title: 'Blog with eventually more than zero likes',
          author: 'Author 2',
          url: 'http://testurl2.org',
        })

        let blogTexts = await page.getByTestId('title-and-author')

        await blogTexts
          .last()
          .getByRole('button', { name: 'show' })
          .last()
          .click()

        await blogTexts
          .last()
          .locator('..')
          .getByRole('button', { name: 'like' })
          .click()

        await expect(
          blogTexts.last().locator('..').getByText('likes: 1')
        ).toBeVisible()

        await page.reload()

        blogTexts = await page.getByTestId('title-and-author')

        await expect(
          blogTexts
            .first()
            .getByText('Blog with eventually more than zero likes Author 2')
        ).toBeVisible()
        await expect(
          blogTexts.last().getByText('Blog with zero likes Author 1')
        ).toBeVisible()
      })
    })
  })
})
