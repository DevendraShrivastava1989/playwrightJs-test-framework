import BasePage from './basePage'
import fs from 'fs'

const appLogo = '.app_logo'
const burgerMenuBtn = '#react-burger-menu-btn'
const shoppingCartLink = '.shopping_cart_link'
const fleeceJacketname = '#item_5_title_link'
const footerText = '.footer_copy'
const twitterLink = 'text=Twitter'
const facebookLink = 'text=Facebook'
const linkedInLink = 'text=LinkedIn'
const title = '.title'
const cartQuantityLabel = '.cart_quantity_label'
const cartItemLabel = '.cart_item_label'
const cartDescriptionLabel = '.cart_desc_label'
const cartQuantity = '.cart_quantity'
const flecceJacketText = "//div[@class='inventory_item_desc']"
const fleeceJacketPrice = "//div[@class='inventory_item_price']"
const continueShoppingButton = "[data-test='continue-shopping']"
const removeButton = "[data-test='remove-sauce-labs-fleece-jacket']"
const removeButtonTshirtRed = "[data-test='remove-test.allthethings()-t-shirt-(red)']"
const checkoutButton = "[data-test='checkout']"

const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

class YourCartPage extends BasePage {
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

	async shoppingCartCount() {
		return await this.verifyElementText(
			shoppingCartLink,
			testData.shoppingCartCount
		)
	}

	async titleVisible() {
		return await this.isElementVisible(title, testData.notVisibleText)
	}

	async quantityAndDescriptionLabelVisible() {
		await this.isElementVisible(cartQuantityLabel, testData.notVisibleText)
		return await this.isElementVisible(
			cartDescriptionLabel,
			testData.notVisibleText
		)
	}

	async cartQuantityVisible() {
		await this.isElementVisible(cartQuantity, testData.notVisibleText)
		return await this.verifyElementText(cartQuantity, testData.cartQuantity)
	}

	async itemNameVisible() {
		return await this.isElementVisible(
			fleeceJacketname,
			testData.notVisibleText
		)
	}

	async itemTextVisible() {
		return await this.isElementVisible(
			flecceJacketText,
			testData.notVisibleText
		)
	}

	async itemPriceVisible() {
		return await this.isElementVisible(
			fleeceJacketPrice,
			testData.notVisibleText
		)
	}

	async continueShoppingBtnIsEnabled() {
		return await this.isElementEnabled(
			continueShoppingButton,
			testData.notEnabledText
		)
	}

	async removeBtnIsEnabled() {
		return await this.isElementEnabled(removeButton, testData.notEnabledText)
	}

	async checkoutBtnIsEnabled() {
		return await this.isElementEnabled(checkoutButton, testData.notEnabledText)
	}

	async VerifySocialandFooterLinks() {
		await this.isElementVisible(facebookLink, testData.notVisibleText)
		await this.isElementVisible(twitterLink, testData.notVisibleText)
		await this.isElementVisible(linkedInLink, testData.notVisibleText)
		// await this.isElementVisible(swagBotFooter, testData.notVisibleText)
		await this.isElementVisible(footerText, testData.notVisibleText)
	}

	async clickContinueShoppingBtn() {
		return await this.waitAndClick(continueShoppingButton)
	}

	async clickCheckoutBtn() {
		return await this.waitAndClick(checkoutButton)
	}

	async clickRemoveBtnForItems() {
		await this.waitAndClick(removeButton)
		return await this.waitAndClick(removeButtonTshirtRed)
	}

	async cartItemAndQuantityLabelNotVisible() {
		await this.isElementNotVisible(cartQuantityLabel, testData.notAvailabletext)
		await this.isElementNotVisible(cartItemLabel, testData.notAvailabletext)
	}
}
export default YourCartPage
