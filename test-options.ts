import { test as base, expect } from '@playwright/test';
import { PageManager } from './page-objects/pageManager';
import getProducts from './helpers/products';
import { faker } from '@faker-js/faker';

export type TestOptions = {
    userOnCheckoutOverview: '';
}

const PRODUCTS = getProducts();

export const test = base.extend<TestOptions>({
    userOnCheckoutOverview: async ({ page }, use) => {
        const pm = new PageManager(page);
        await pm.onInventoryPage().addItemToCart(PRODUCTS);
        await pm.onHeaderPage().navigateToCartPage();
        await pm.onCartPage().navigateToCheckout();
        await pm.onCheckoutFormPage().fillFormUserInfo({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode()
        })
        await pm.onCheckoutFormPage().submitFormUserInfo();
        await use('');
    }
})

export { expect };