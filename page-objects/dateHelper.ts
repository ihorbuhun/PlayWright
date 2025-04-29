import {Page} from '@playwright/test'

export class DateHelper {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async getShortMonth(date: Date): Promise<string> {
        return date.toLocaleString('En-US', {month: 'short'})
    }

    async getLongMonth(date: Date): Promise<string> {
        return date.toLocaleString('En-US', {month: 'long'})
    }
}