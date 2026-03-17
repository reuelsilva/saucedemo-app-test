import { Page } from "@playwright/test";

interface LoginProps{
    username: string;
    password: string;
}

export class LoginPage{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page
    }

    async login({username, password}: LoginProps){
        const fieldUsername = this.page.getByTestId('username');
        const fieldPassword = this.page.getByTestId('password');

        await fieldUsername.fill(username);
        await fieldPassword.fill(password);
        await this.page.getByTestId('login-button').click();
    }
}