import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { InventoryPage } from "./inventoryPage";
import { HeaderPage } from "./headerPage";
import { CartPage } from "./cartPage";
import { CheckoutFormPage } from "./checkoutFormPage";

export class PageManager{
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly invetoryPage: InventoryPage;
    private readonly headerPage: HeaderPage;
    private readonly cartPage: CartPage;
    private readonly checkoutFormPage: CheckoutFormPage;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.invetoryPage = new InventoryPage(page);
        this.headerPage = new HeaderPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutFormPage = new CheckoutFormPage(page);
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

    onCheckoutFormPage(){
        return this.checkoutFormPage;
    }
}