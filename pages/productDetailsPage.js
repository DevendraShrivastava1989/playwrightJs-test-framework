import BasePage from './basePage'
import fs from 'fs'

const appLogo = '.app_logo'
const burgerMenuBtn = '#react-burger-menu-btn'
const shoppingCartLink = '.shopping_cart_link'
const footerText = '.footer_copy'
const twitterLink = 'text=Twitter'
const facebookLink = 'text=Facebook'
const linkedInLink = 'text=LinkedIn'
const image = "img[alt='Sauce Labs Backpack']"
const backToProductsButton = "[data-test='back-to-products']"
const productName = '.inventory_details_name.large_size'
const productDescription = '.inventory_details_desc.large_size'
const productPrice = '.inventory_details_price'
const addToCartButton = "[data-test^='add-to-cart']"
const removeButton = "[data-test^='remove']"

const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

class ProductDetailsPage extends BasePage {
	constructor(page) {
		super(page)
	}

	async verifyLogoVisible() {
		return await this.isElementVisible(appLogo, testData.notVisibleText)
	}

	async verifyBurgerMenuButtonVisible() {
		return await this.isElementVisible(burgerMenuBtn, testData.notVisibleText)
	}

	async shoppingCartLinkVisible() {
		return await this.isElementVisible(
			shoppingCartLink,
			testData.notVisibleText
		)
	}

	async imageVisible() {
		return await this.isElementVisible(image, testData.notVisibleText)
	}

	async backToProductsButtonIsEnabled() {
		return await this.isElementEnabled(
			backToProductsButton,
			testData.notEnabledText
		)
	}

	async productNameVisible() {
		return await this.isElementVisible(productName, testData.notVisibleText)
	}

	async productDescriptionVisible() {
		return await this.isElementVisible(
			productDescription,
			testData.notVisibleText
		)
	}

	async productDescriptionVisible() {
		return await this.isElementVisible(
			productDescription,
			testData.notVisibleText
		)
	}

	async productPriceVisible() {
		return await this.isElementVisible(productPrice, testData.notVisibleText)
	}

	async clickAddToCartButton() {
		//await this.isElementEnabled(addToCartButton, testData.notEnabledText)
		return await this.waitAndClick(addToCartButton)
	}

	async clickRemoveButton() {
		await this.isElementEnabled(removeButton, testData.notEnabledText)
		return await this.waitAndClick(removeButton)
	}

	async shoppingCartCount() {
		return await this.verifyElementText(
			shoppingCartLink,
			testData.shoppingCartCount
		)
	}

	async shoppingCartCountAsEmpty() {
		return await this.verifyElementText(
			shoppingCartLink,
			testData.cartCountEmpty
		)
	}

	async VerifySocialandFooterLinks() {
		await this.isElementVisible(facebookLink, testData.notVisibleText)
		await this.isElementVisible(twitterLink, testData.notVisibleText)
		await this.isElementVisible(linkedInLink, testData.notVisibleText)
		// await this.isElementVisible(swagBotFooter, testData.notVisibleText)
		await this.isElementVisible(footerText, testData.notVisibleText)
	}

	async clickBackToProductsButton() {
		return await this.waitAndClick(
			backToProductsButton,
			testData.notEnabledText
		)
	}
}
export default ProductDetailsPage
