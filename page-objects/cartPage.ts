import { Page } from "@playwright/test";

export class CartPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async removeItemFromCart(items: {
        name: string;
        price: string;
    }[]) {
        for (const item of items) {
            await this.page.locator('.cart_list .cart_item', { hasText: item.name }).getByRole('button', { name: 'Remove' }).click();
        }
    }

    async navigateToCheckout(){
        await this.page.getByTestId('checkout').click();
    }
}