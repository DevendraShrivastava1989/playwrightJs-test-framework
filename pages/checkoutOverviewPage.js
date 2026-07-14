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
const cartQuantityLabel = '.cart_quantity_label'
const cartDescriptionLabel = '.cart_desc_label'
const cartQuantity = '.cart_quantity'
const flecceJacketText = "//div[@class='inventory_item_desc']"
const fleeceJacketPrice = "//div[@class='inventory_item_price']"
const cancelButton = "[data-test='cancel']"
const title = '.title'
const paymentInformationLabel = 'text=Payment Information'
const secureCardInfo = "div[class='summary_info'] div:nth-child(2)"
const shippingInformationLabel = 'text=Shipping Information'
const deliveryMessage = 'text=Free Pony Express Delivery!'
const itemTotalLabel = '.summary_subtotal_label'
const itemTaxLabel = '.summary_tax_label'
const summaryTotalLabel = '.summary_total_label'
const finishButton = "[data-test='finish']"

const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

class CheckoutOverviewPage extends BasePage {
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

	async paymentInformationLabelVisible() {
		return await this.isElementVisible(
			paymentInformationLabel,
			testData.notVisibleText
		)
	}

	async secureCardInfoVisible() {
		return await this.isElementVisible(secureCardInfo, testData.notVisibleText)
	}

	async shippingInformationLabelVisible() {
		return await this.isElementVisible(
			shippingInformationLabel,
			testData.notVisibleText
		)
	}

	async deliveryMessageVisible() {
		return await this.isElementVisible(deliveryMessage, testData.notVisibleText)
	}

	async itemTotalLabelVisible() {
		return await this.isElementVisible(itemTotalLabel, testData.notVisibleText)
	}

	async itemTaxLabelVisible() {
		return await this.isElementVisible(itemTaxLabel, testData.notVisibleText)
	}

	async summaryTotalLabelVisible() {
		return await this.isElementVisible(
			summaryTotalLabel,
			testData.notVisibleText
		)
	}

	async cancelBtnIsEnabled() {
		return await this.isElementEnabled(cancelButton, testData.notEnabledText)
	}

	async finishBtnIsEnabled() {
		return await this.isElementEnabled(finishButton, testData.notEnabledText)
	}

	async VerifySocialandFooterLinks() {
		await this.isElementVisible(facebookLink, testData.notVisibleText)
		await this.isElementVisible(twitterLink, testData.notVisibleText)
		await this.isElementVisible(linkedInLink, testData.notVisibleText)
		// await this.isElementVisible(swagBotFooter, testData.notVisibleText)
		await this.isElementVisible(footerText, testData.notVisibleText)
	}

	async clickFinishBtn() {
		return await this.waitAndClick(finishButton, testData.notEnabledText)
	}
}
export default CheckoutOverviewPage
