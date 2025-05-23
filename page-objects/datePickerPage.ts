import {expect, Page} from '@playwright/test'
import {DateHelper} from "./dateHelper";

export class DatePickerPage extends DateHelper{

    constructor(page: Page) {
        super(page);
    }

    async selectCommondatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()

        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)

        await expect (calendarInputField). toHaveValue(dateToAssert)
    }

    async selectDatePickerWithRangeFromToday(startDateFromToday: number, endDateFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()

        const startDateToAssert = await this.selectDateInTheCalendar(startDateFromToday)
        const endDateToAssert = await this.selectDateInTheCalendar(endDateFromToday)
        const dateToAssert = `${startDateToAssert} - ${endDateFromToday}`

    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate( ).toString()
        const expectedMonthShot = this.getShortMonth(date)
        const expectedMonthLong = this.getLongMonth(date)
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

        // @ts-ignore
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()

        return dateToAssert;
    }
}