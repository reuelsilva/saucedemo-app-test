import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { InventoryPage } from "./inventoryPage";
import { HeaderPage } from "./headerPage";
import { CartPage } from "./cartPage";

export class PageManager{
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly invetoryPage: InventoryPage;
    private readonly headerPage: HeaderPage;
    private readonly cartPage: CartPage;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.invetoryPage = new InventoryPage(page);
        this.headerPage = new HeaderPage(page);
        this.cartPage = new CartPage(page);
    }

    onLoginPage(){
        return this.loginPage;
    }

    onInventoryPage(){
        return this.invetoryPage;
    }
    
    onHeaderPage(){
        return this.headerPage;
    }

    onCartPage(){
        return this.cartPage;
    }
}