import { Page } from "@playwright/test";

interface formUserInfoprops{
    firstName: string;
    lastName: string;
    postalCode: string;
}

export class CheckoutFormPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async fillFormUserInfo({firstName, lastName, postalCode}: formUserInfoprops) {
        await this.page.getByTestId('firstName').fill(firstName);
        await this.page.getByTestId('lastName').fill(lastName);
        await this.page.getByTestId('postalCode').fill(postalCode);
    }

    async submitFormUserInfo(){
        await this.page.getByTestId('continue').click();
    }
}