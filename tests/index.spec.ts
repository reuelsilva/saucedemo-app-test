import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import getProducts from '../helpers/products';

let pm: PageManager;

const PRODUCTS = getProducts();

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    pm = new PageManager(page);

})

test.describe('Login', () => {
    test('Deve redirecionar o usuário para a página de inventário', async ({ page }) => {
        await pm.onLoginPage().login({
            username: process.env.VALID_USERNAME!,
            password: process.env.VALID_PASSWORD!
        })

        await expect(page).toHaveURL('/inventory.html');
        await expect(page.locator('.inventory_list')).toBeVisible();
    })

    test('Deve exibir erro ao tentar login com senha incorreta', async ({ page }) => {
        await pm.onLoginPage().login({
            username: process.env.VALID_USERNAME!,
            password: process.env.INVALID_PASSWORD!
        })

        await expect(page.getByTestId('error')).toContainText('Username and password do not match');
    })

    test('Deve exibir erro ao tentar login com campo password vazio', async ({ page }) => {
        await pm.onLoginPage().login({
            username: process.env.VALID_USERNAME!,
            password: '',
        })

        await expect(page.getByTestId('error')).toContainText('Password is required');
    })

    test('Deve exibir erro ao tentar login com campo username vazio', async ({ page }) => {
        await pm.onLoginPage().login({
            username: '',
            password: process.env.VALID_PASSWORD!
        })

        await expect(page.getByTestId('error')).toContainText('Username is required');
    })
})

test.describe('Adicionar/remover produtos pela página de inventário', () => {
    test.beforeEach(async () => {
        await pm.onLoginPage().login({
            username: process.env.VALID_USERNAME!,
            password: process.env.VALID_PASSWORD!
        })
    })

    test('Deve atualizar o contador ao adicionar produto ao carrinho', async ({ page }) => {
        await pm.onInventoryPage().addItemToCart(PRODUCTS);

        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    })

    test('Deve atualizar o contador ao remover produto do carrinho', async ({ page }) => {
        await pm.onInventoryPage().addItemToCart(PRODUCTS)
        await pm.onInventoryPage().delItemFromCart([PRODUCTS[0]]);

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    })

    test('Deve exibir botão "Remove" ao adicionar produto ao carrinho', async ({ page }) => {
        await pm.onInventoryPage().addItemToCart(PRODUCTS);

        for (const product of PRODUCTS) {
            await expect(pm.onInventoryPage().getItemButton(product, 'Remove')).toBeVisible();
            await expect(pm.onInventoryPage().getItemButton(product, 'Add to cart')).not.toBeVisible();
        }
    })

    test('Deve exibir botão "Add to cart" ao remover produto do carrinho', async ({ page }) => {
        await pm.onInventoryPage().addItemToCart(PRODUCTS);
        await pm.onInventoryPage().delItemFromCart([PRODUCTS[0]]);

        await expect(pm.onInventoryPage().getItemButton(PRODUCTS[0], 'Add to cart')).toBeVisible();
        await expect(pm.onInventoryPage().getItemButton(PRODUCTS[0], 'Remove')).not.toBeVisible();

    })

    test('Deve excluir o contador ao esvaziar o carrinho', async ({ page }) => {
        await pm.onInventoryPage().addItemToCart(PRODUCTS);
        await pm.onInventoryPage().delItemFromCart(PRODUCTS);

        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    })
})
