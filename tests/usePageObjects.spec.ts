import {test} from 'playwright/test'
import {PageObjectManager} from '../page-objects/pageObjectManager'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async({page}) => {
    const pm = new PageObjectManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async({page}) => {
    const pm = new PageObjectManager(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('John Wick', 'John@google.com', true)
    await pm.navigateTo().datepickerPage()
    await pm.onDatePickerPage().selectCommondatePickerDateFromToday(5)
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(6, 15)
})