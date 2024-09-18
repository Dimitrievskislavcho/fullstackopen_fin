const { expect } = require('@playwright/test')

const login = async (page, { username, password }) => {
  await page.getByTestId('username').type(username)
  await page.getByTestId('password').type(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const assertLoginPageContent = async (page) => {
  await expect(page.getByText('log in to application')).toBeVisible()
  await expect(page.getByTestId('username')).toBeVisible()
  await expect(page.getByTestId('password')).toBeVisible()
  await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
}

module.exports = {
  login,
  assertLoginPageContent,
}
