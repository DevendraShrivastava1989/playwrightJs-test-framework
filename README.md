### Playwright UI Automation Agent (Playwright-based)

A lightweight UI automation agent built on Playwright. QA engineers can run quick URL-driven checks or Excel/CSV-driven test cases without editing the Playwright test files. The repository still contains full Playwright `tests/TC_*.test.js` examples.

#### UI Automation Agent

This repository includes a simple CLI "agent" that lets a QA engineer quickly run UI automation by providing either a website URL or an Excel/CSV test-case file. The agent is intended for fast exploratory checks or running data-driven scenarios without editing the Playwright test files.

Quick start examples:

Run a single URL (opens the site and captures a screenshot):

```bash
npm run agent:url
# or
node agent/automationAgent.js --url https://www.saucedemo.com --browser chromium
```

Run the sample CSV/Excel-driven test (the included sample is `data/agent-test-cases.csv`):

```bash
npm run agent:excel
# or
node agent/automationAgent.js --excel ./data/agent-test-cases.csv --browser chromium
```

CSV/Excel format (header row) and a minimal example row:

```csv
TestCase,WebsiteURL,StepAction,Selector,Value,Notes
LoginUI,https://www.saucedemo.com,open,,,
LoginUI,https://www.saucedemo.com,waitForSelector,#user-name,5000,Wait for username field
LoginUI,https://www.saucedemo.com,fill,#user-name,standard_user,Type username
LoginUI,https://www.saucedemo.com,fill,#password,secret_sauce,Type password
LoginUI,https://www.saucedemo.com,click,#login-button,,Click login
LoginUI,https://www.saucedemo.com,waitForSelector,.inventory_list,5000,Wait for products list
LoginUI,https://www.saucedemo.com,assertTitleContains,,Swag Labs,Verify title contains 'Swag Labs'
```

Supported StepAction values: `open`, `navigate`, `click`, `fill`, `select`, `press`, `hover`, `wait`, `waitForSelector`, `assertTitleContains`, `assertTextContains`, `assertUrlContains`, `screenshot`, `scrollIntoView`.

Notes:
- The agent uses Playwright under the hood; it launches a real browser and will save screenshots to the repo root (example: `agent-url-launch-screenshot.png`).
- Keep existing `tests/TC_*.test.js` files — they remain full Playwright examples and are not modified by the agent.

#### Application Under Test

We are using https://www.saucedemo.com/ as the Application Under Test. This App is a **React.js** Frontend

- URL: https://www.saucedemo.com/ 
- OS : Windows 10 
- IDE : Visual Studio Code
 
#### Scenarios

```bash
Scenario 1: Login as a standard user to verify the products page and logout from the application

Scenario Description: User logs into the website and verifies all the elements on the products
page and logs out from the application. This is like a Smoke test.

Testname: TC_01_productPage.test.js
```
 
```bash
Scenario 2: Login as a standard user to complete the checkout workflow

Scenario Description: User logs into the website and completes the checkout workflow and logs out
from the application. This is a Happy path test scenario.

Testname: TC_02_checkoutWorkflow.test.js
```

```bash
Scenario: 3: Login as a standard user to select a product item and then login as a performance_glitch_user
to complete the checkout workflow

Scenario Description: The application is verified with all the necessary buttons and links on all the pages
including error messages by the standard user. Then the checkout process is therefore completed by the performance_glitch_user.

Testname: TC_03_checkoutWithSUandPGU.test.js
```

```bash 
Scenario 4: Login as a “problem_user” to add a product item to the shopping cart and then complete
the checkout workflow by logging in as a “performance_glitch_user”

Scenario Description: User is logged in as “Problem_user” and adds an item to the cart. User fills in
the firstname, lastname and postal code. Since the “Problem_user” cannot perform the checkout process because
of the lastname error message, user logs off the application.
Performance_glitch_user log into the application and completes the checkout workflow.

Testname: TC_04_checkoutWithPUandPGU.test.js
```

```bash 
Scenario 5: Login as locked_out_user to verify error message and then Login as performance_glitch_user
to add a product item to the cart and logout from the application.
Login as a standard user now to complete the checkout workflow.

Scenario Description: User is logged in as “Locked_out_user” to validate the error message on the Login page.
Now, Login as a performace_glitch_user and add a product item to the cart and logout of the application.
Standard user is logged in and verifies the product item added by the performance glitch user earlier
and completes the checkout workflow.

Testname: TC_05_checkoutWithPGUandSU.test.js
```

#### Installation

Install the dependencies and devDependencies to run the test.

- Clone (OR) Download this repo as zip folder on to your local machine
- Navigate to project's directory on terminal and run the following commands:

Clone the repository

```bash
git clone https://github.com/DevendraShrivastava1989/playwrightJs-test-framework.git
```

Install dependencies

```bash
npm install
npx playwright install
```

#### Run application

Run tests in Parallel chrome

```bash
npm run test:chrome - For tests only on chrome browser
```

Run tests in Parallel firefox

```bash
npm run test:firefox - For tests only on firefox browser
```

Run tests in Parallel safari

```bash
npm run test:safari - For tests only on safari browser
```

Run tests in Parallel edge

```bash
npm run test:edge - For tests only on edge browser
```

Run tests in Parallel on all browsers (chrome, safari, edge and firefox)

```bash
npm run test  - For tests only on all browsers
```

#### UI Automation Agent

This framework now includes a simple automation agent for QA users.

- Run a URL-driven automation session:

```bash
npm run agent:url
```

or:

```bash
node agent/automationAgent.js --url https://www.saucedemo.com
```

- Run an Excel-driven automation session:

```bash
npm run agent:excel
```

or:

```bash
node agent/automationAgent.js --excel ./data/agent-test-cases.csv
```

The Excel test case file uses columns such as `TestCase`, `WebsiteURL`, `StepAction`, `Selector`, `Value`, and `Notes`.
Supported actions include `open`, `navigate`, `click`, `fill`, `waitForSelector`, `assertTitleContains`, `assertTextContains`, `assertUrlContains`, and `screenshot`.

Existing `tests/TC_*.test.js` files remain unchanged and continue to serve as example Playwright test cases.

#### Playwright Test Report 

```bash
Html-test-report :
npm run test:chrome (OR)  npm run test:edge (OR) npm run html-report
```

#### Allure Test Report

```bash
Allure-test-report :
1.	npm run allure:clean
2.	npm run test:firefox (OR) npm run test:safari
3.	npm run allure:report
```
#### Playwright MCP (Model Context Protocol)

This repository includes `mcp.json` for Playwright MCP integration. The MCP server is configured to start using:

```bash
npx @playwright/mcp@latest
```

Use MCP for IDE-driven automation workflows, server-managed test execution, and better integration with tools that support Playwright MCP.

- Confirm MCP is available:

```bash
npx @playwright/mcp@latest --help
```

- The `mcp.json` file is already configured to use the Playwright MCP server in this workspace.

#### GitHub Actions CI

A GitHub Actions workflow is included at `.github/workflows/playwright-ci.yml`.

It runs on every push to the `main` branch and performs the following steps:

1. Checks out the repository
2. Installs Node.js dependencies
3. Installs Playwright browsers
4. Runs `npx playwright test --reporter=html`
5. Uploads the generated `playwright-report` directory as an artifact

#### Run a specific test file

```bash
npx playwright test tests/TC_01_productPage.test.js
```

#### Run all tests with HTML report

```bash
npx playwright test --reporter=html
```

Then view the report locally with:

```bash
npx playwright show-report```
