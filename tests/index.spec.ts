import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker';
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
            await expect(pm.onInventoryPage().getItemButton(product.name, 'Remove')).toBeVisible();
            await expect(pm.onInventoryPage().getItemButton(product.name, 'Add to cart')).not.toBeVisible();
        }
    })

    test('Deve exibir botão "Add to cart" ao remover produto do carrinho', async ({ page }) => {
        await pm.onInventoryPage().addItemToCart(PRODUCTS);
        await pm.onInventoryPage().delItemFromCart([PRODUCTS[0]]);

        await expect(pm.onInventoryPage().getItemButton(PRODUCTS[0].name, 'Add to cart')).toBeVisible();
        await expect(pm.onInventoryPage().getItemButton(PRODUCTS[0].name, 'Remove')).not.toBeVisible();

    })

    test('Deve excluir o contador ao esvaziar o carrinho', async ({ page }) => {
        await pm.onInventoryPage().addItemToCart(PRODUCTS);
        await pm.onInventoryPage().delItemFromCart(PRODUCTS);

        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    })
})

test.describe('Página do Carrinho', () => {
    test.beforeEach(async () => {
        await pm.onLoginPage().login({
            username: process.env.VALID_USERNAME!,
            password: process.env.VALID_PASSWORD!
        })
    })

    test('Deve exibir produto no carrinho ao adiciona-lo pela página de inventário', async ({ page }) => {
        await pm.onInventoryPage().addItemToCart([PRODUCTS[0]]);
        await pm.onHeaderPage().navigateToCartPage();

        for (const product of [PRODUCTS[0]]) {
            const cartItem = page.locator('.cart_list').locator('.cart_item', { hasText: product.name });

            await expect(cartItem.locator('.inventory_item_name')).toHaveText(product.name);
            await expect(cartItem.locator('.inventory_item_price')).toHaveText(`$${product.price}`);
            await expect(cartItem.locator('.cart_quantity')).toHaveText('1')
        }
    })

    test('Deve excluir produto ao remover pela página do carrinho', async ({ page }) => {
        await pm.onInventoryPage().addItemToCart([PRODUCTS[0]]);
        await pm.onHeaderPage().navigateToCartPage();
        await pm.onCartPage().removeItemFromCart([PRODUCTS[0]]);

        await expect(page.locator('.cart_list').locator('.cart_item', { hasText: PRODUCTS[0].name })).not.toBeVisible();
    })

    test('Deve permanecer na página do carrinho ao usuário tentar prosseguir para o checkout com carrinho vazio', async ({ page }) => {
        test.fail()
        await pm.onHeaderPage().navigateToCartPage();
        await pm.onCartPage().navigateToCheckout();

        await expect(page).toHaveURL('/cart.html');
    })
})

test.describe('Página Checkout: Your information', () => {
    test.beforeEach(async () => {
        await pm.onLoginPage().login({
            username: process.env.VALID_USERNAME!,
            password: process.env.VALID_PASSWORD!
        })

        await pm.onInventoryPage().addItemToCart([PRODUCTS[0]]);
        await pm.onHeaderPage().navigateToCartPage();
        await pm.onCartPage().navigateToCheckout();
    })

    test.describe('Envio com sucesso do formulário', () => {
        test('Deve redirecionar o usuario para a página "Checkout: Overview"', async ({ page }) => {
            await pm.onCheckoutFormPage().fillFormUserInfo({ 
                firstName: faker.person.firstName(), 
                lastName: faker.person.lastName(), 
                postalCode: faker.location.zipCode()
            })
            await pm.onCheckoutFormPage().submitFormUserInfo();

            await expect(page).toHaveURL('/checkout-step-two.html');
            await expect(page.getByTestId('title')).toHaveText('Checkout: Overview');
            await expect(page.locator('.cart_list').locator('.cart_item', { hasText: PRODUCTS[0].name })).toBeVisible();
        })
    })

    test.describe('Tratamento de erro no envio do formulário', () => {
        test('Deve exibir erro ao enviar formulário com campo "First Name" vazio', async ({ page }) => {
            await pm.onCheckoutFormPage().fillFormUserInfo({
                firstName: '', 
                lastName: faker.person.lastName(), 
                postalCode: faker.location.zipCode()
            })
            await pm.onCheckoutFormPage().submitFormUserInfo();

            await expect(page.getByTestId('error')).toContainText('First Name is required');
        })

        test('Deve exibir erro ao enviar formulário com campo "Last Name" vazio', async ({ page }) => {
            await pm.onCheckoutFormPage().fillFormUserInfo({
                firstName: faker.person.firstName(), 
                lastName: '', 
                postalCode: faker.location.zipCode()
            })
            await pm.onCheckoutFormPage().submitFormUserInfo();

            await expect(page.getByTestId('error')).toContainText('Last Name is required');
        })

        test('Deve exibir erro ao enviar formulário com campo "Zip/Postal Code" vazio', async ({ page }) => {
            await pm.onCheckoutFormPage().fillFormUserInfo({
                firstName: faker.person.firstName(), 
                lastName: faker.person.lastName(), 
                postalCode: ''
            })
            await pm.onCheckoutFormPage().submitFormUserInfo();

            await expect(page.getByTestId('error')).toContainText('Postal Code is required');
        })
    })
})