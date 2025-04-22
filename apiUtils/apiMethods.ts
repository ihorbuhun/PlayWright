import {Page, request, APIRequestContext, expect} from '@playwright/test'

export class ApiMethods {

    async login(login: string, password: string): Promise<string> {
         let apiContext = await request.newContext({
            baseURL: 'https://conduit-api.bondaracademy.com'
        })

        const res = await apiContext.post('/api/users/login', {
            data: {
                "user": {
                    "email": login,
                    "password": password,
                },
            },
        });
        const responseBody = await res.json()
        console.log(responseBody);
        return responseBody.user.token
    }

    async getFirstArticleName(): Promise<string>{

        let apiContext = await request.newContext({
            baseURL: 'https://conduit-api.bondaracademy.com'
        })

        let res = await apiContext.get('/api/articles?limit=10&offset=0')
        expect(res.status()).toEqual(200)
        const responseBody = await res.json()
        const deletedArticleName = responseBody.articles[0].slug
        console.log('\nFirst article name ' + deletedArticleName)
        return deletedArticleName
    }

    async createArticle(): Promise<string>{

        let apiContext = await request.newContext({
            baseURL: 'https://conduit-api.bondaracademy.com'
        })

        let res = await apiContext.post('/api/articles/', {
            data:{
                "article":{"title":"This is test title","description":"This is test description","body":"testBody","tagList":[]}
            }
        })
        expect(res.status()).toEqual(201)
        const responseBody = await res.json()
        return responseBody.article.slug
    }

    async delete(articleName: string) {
        let apiContext = await request.newContext({
            baseURL: 'https://conduit-api.bondaracademy.com'
        })

        let res = await apiContext.delete('/api/articles/' + articleName)
        console.log(res)
        return res.status()
    }
}