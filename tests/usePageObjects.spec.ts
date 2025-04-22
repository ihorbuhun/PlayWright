import {test, expect} from 'playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from "../page-objects/formLayoutsPage";
import {DatePickerPage} from "../page-objects/datePickerPage";

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('parametrized methods', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const datePickerPage = new DatePickerPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('John Wick', 'John@google.com', true)
    await navigateTo.datepickerPage()
    await datePickerPage.selectCommondatePickerDateFromToday(5)
    await datePickerPage.selectDatePickerWithRangeFromToday(6, 15)
})