import { Page } from "@playwright/test";

export class InventoryPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addItemToCart(items: string[]) {
        for (const item of items) {
            const itemInventory = this.page.locator('.inventory_item', { hasText: item });
            await itemInventory.getByRole('button', { name: 'Add to cart' }).click();
        }
    }

    async delItemFromCart(items: string[]) {
        for (const item of items) {
            const itemInventory = this.page.locator('.inventory_item', { hasText: item });
            await itemInventory.getByRole('button', { name: 'Remove' }).click();
        }
    }

    getItemButton(item:string, textButton: string){
        return this.page.locator('.inventory_item', {hasText: item}).getByRole('button', {name: textButton});
    }
}
