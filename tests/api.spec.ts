import { test, expect } from '@playwright/test';
import tags from '../test-data/tags.json';
import {ApiMethods} from '../apiUtils/apiMethods'
import user from '../.auth/user.json'

// test.beforeEach(async ({page}) => {
//
//   await page.route('*/**/api/tags', async routeFunctionName => {
//     await routeFunctionName.fulfill({
//       body: JSON.stringify(tags)
//     })
//   })
//
//   await page.goto('https://conduit.bondaracademy.com')
// })

test('has title', async ({page}) => {
  await page.route('*/**/api/articles*', async routeFunction => {
    const response = await routeFunction.fetch()
    const responseBody = await response.json()
    responseBody.articles[0].title = "This IS SPARTAAAAAA!"
    responseBody.articles[0].description = "This IS SPARTAAAAAA description!"

    await routeFunction.fulfill({
      body: JSON.stringify(responseBody)
    })
  })

  await page.getByText('Global Feed').click()

  await expect(page.locator('.navbar-brand')).toHaveText('conduit')
  await expect(page.locator('app-article-list h1').first()).toContainText('This IS SPARTAAAAAA!')
  await expect(page.locator('app-article-list p').first()).toHaveText('This IS SPARTAAAAAA description!')
})

test('create article simple', async ({request}) => {


  await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: {
      "article": {"title": "123", "description": "456", "body": "sdfhboooodyyyyydsfh", "tagList": []}
    },
  })
})

test('create article PageObject', async () => {
  var apiMethods = new ApiMethods()
  let token = await apiMethods.login("hail@gmail.com", "skater")
  await apiMethods.createArticle()
})

test('create article with GUI (intercept GUI-API response)', async ({page}) => {
  await page.goto('https://conduit.bondaracademy.com')

  await page.getByText('New Article').click()
  await page.getByRole('textbox', {name: 'Article Title'}).fill('Playwright is awesome')
  await page.getByRole('textbox', {name: 'What\'s this article about?'}).fill('About the Playwright')
  await page.getByRole('textbox', {name: 'Write your article (in markdown)'}).fill('We like to use playwright for automation')
  await page.getByRole('button', {name: 'Publish Article'}).click()

  const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
  const articleResponseBody = await articleResponse.json()
  const slugId = articleResponseBody.article.slug

  await expect(page.locator('.article-page h1')).toContainText('Playwright is awesome')
  await page.getByText('Home').click()
  await page.getByText('Global Feed').click()
  await expect(page.locator('app-article-list h1').first()).toContainText('Playwright is awesome')

  var apiMethods = new ApiMethods()
  let token = await apiMethods.login("hail@gmail.com", "skater")
  await apiMethods.delete(slugId)
})

test('delete article', async ({page}) => {
  var apiMethods = new ApiMethods()
  const articleName: string = await apiMethods.createArticle()
  let responseCode = await apiMethods.delete(articleName)
  expect(responseCode).toEqual(204)
  const firstTitleAtThePage = await apiMethods.getFirstArticleName();
  expect(firstTitleAtThePage).not.toContain(articleName)
})




