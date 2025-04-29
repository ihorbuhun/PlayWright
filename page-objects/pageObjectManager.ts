import {Page} from '@playwright/test'

import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'
import {DatePickerPage} from '../page-objects/datePickerPage'

export class PageObjectManager {

    private readonly page: Page
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datePickerPage: DatePickerPage
    private readonly navigationPage: NavigationPage

    constructor(page: Page) {
        this.page = page
        this.formLayoutsPage = new FormLayoutsPage(page)
        this.datePickerPage = new DatePickerPage(page)
        this.navigationPage = new NavigationPage(page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage
    }

    onDatePickerPage(){
        return this.datePickerPage
    }

}