const createBlog = async (page, { title, url, author }) => {
  await page.getByText('blogs').waitFor()
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.locator('form').getByText('title').getByRole('textbox').type(title)
  await page
    .locator('form')
    .getByText('author')
    .getByRole('textbox')
    .type(author)
  await page.locator('form').getByText('url').getByRole('textbox').type(url)

  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} ${author}`).waitFor()
}

module.exports = {
  createBlog,
}
