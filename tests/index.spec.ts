import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

let pm: PageManager;

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
