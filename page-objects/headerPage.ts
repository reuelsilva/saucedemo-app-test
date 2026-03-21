import { Page } from "@playwright/test";

export class HeaderPage{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigateToCartPage(){
        await this.page.locator('.shopping_cart_link').click();
    }
}