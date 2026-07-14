/*
Scenario: Validate Sauce Demo login page UI elements.
This test verifies that the login page loads correctly and that
all expected UI components are visible and enabled.
*/

import test from '../testFixtures/fixture'
import { expect } from '@playwright/test'
import { baseUrl, title } from '../config'

test.describe('Sauce Demo login page UI', () => {
	test('Verify login page UI elements', async ({ loginPage }) => {
		await test.step('Open Sauce Demo login page', async () => {
			await loginPage.openApp()
			expect(await loginPage.getUrl()).toContain(baseUrl)
			expect(await loginPage.getTitle()).toBe(title)
		})

		await test.step('Verify login elements are visible and enabled', async () => {
			//await loginPage.loginPageLogo()
			await loginPage.usernameFieldVisible()
			await loginPage.passwordFieldVisible()
			await loginPage.loginButtonIsVisible()
			await loginPage.loginCredentialsVisible()
			await loginPage.passwordCredentialsVisible()
		})
	})
})
