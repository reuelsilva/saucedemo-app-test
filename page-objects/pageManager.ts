import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { InventoryPage } from "./inventoryPage";

export class PageManager{
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly invetoryPage: InventoryPage;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.invetoryPage = new InventoryPage(page);
    }

    onLoginPage(){
        return this.loginPage;
    }

    onInventoryPage(){
        return this.invetoryPage;
    }
}