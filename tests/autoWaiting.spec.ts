import {test, expect} from '@playwright/test'
test.beforeEach(async ({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click({timeout:5000})
    testInfo.setTimeout(testInfo.timeout + 1000)
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')
    //await successButton.click()
    const text = await successButton.textContent()
    expect(text).toContain("Data loaded")
})

test('auto waiting array', async({page}) => {
    const successButton = page.locator('.bg-success')
    await successButton.waitFor({state: "attached"})
    const text = await successButton.allTextContents()
    expect(text[0]).toContain('Data loaded')
})

test('alternative waits for', async ({page}) => {
    const successButton = page.locator('.bg-success')

//_ wait for element
     //await page.waitForSelector('.bg-success')

//_ wait for particular response
    // await page.waitForResponse( 'http://uitestingplayground.com/ajaxdata')

//_ wait for network calls to be completed ('NOT RECOMMENDED' )
    await page.waitForLoadState('networkidle')
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('auto waiting webElement', async({page}) => {
    const successButton = page.locator('.bg-success')
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

