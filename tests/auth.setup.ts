import {test as setup} from '@playwright/test';
import creds from '../.auth/creds.json'
import user from '../.auth/user.json'
import fs from 'fs'

const authFile = '.auth/user.json'

setup('authentication', async ({request}) => {
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {
                "email": creds.login,
                "password": creds.password,
            },
        },
    });
    const responseBody = await response.json()
    const accessToken = responseBody.user.token

    console.log(responseBody);

    user.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(user))

    process.env['ACCESS_TOKEN'] = accessToken
})

// setup('authentication', async ({page}) => {
//     await page.goto('https://conduit.bondaracademy.com')
//
//     await page.getByText('Sign in').click()
//     await page.getByPlaceholder('Email').fill(creds.login)
//     await page.getByPlaceholder('Password').fill(creds.password)
//     await page.getByRole('button', {name: 'Sign in'}).first().click()
//
//     await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')
//
//     await page.context().storageState({path: authFile})
// })