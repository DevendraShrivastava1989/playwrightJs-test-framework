const fs = require('fs')
const path = require('path')
const xlsx = require('xlsx')
const { chromium, firefox, webkit } = require('playwright')

const USAGE = `Usage:
  node agent/automationAgent.js --url <website-url> [--browser chromium|firefox|webkit|chrome]
  node agent/automationAgent.js --excel <data-file> [--browser chromium|firefox|webkit|chrome]

Examples:
  node agent/automationAgent.js --url https://www.saucedemo.com
  node agent/automationAgent.js --excel ./data/agent-test-cases.csv --browser chromium
` 

function parseArgs() {
  const args = {}
  const raw = process.argv.slice(2)
  for (let i = 0; i < raw.length; i += 1) {
    const arg = raw[i]
    if (arg === '--url') {
      args.url = raw[i + 1]
      i += 1
    } else if (arg === '--excel') {
      args.excel = raw[i + 1]
      i += 1
    } else if (arg === '--browser') {
      args.browser = raw[i + 1]
      i += 1
    } else if (arg === '--help' || arg === '-h') {
      args.help = true
    }
  }
  return args
}

function normalizeBrowserName(browserName = 'chromium') {
  const normalized = (browserName || 'chromium').toString().toLowerCase()
  if (normalized === 'chrome') return 'chromium'
  if (['chromium', 'firefox', 'webkit'].includes(normalized)) return normalized
  return 'chromium'
}

function openBrowser(browserName) {
  if (browserName === 'firefox') return firefox.launch({ headless: false })
  if (browserName === 'webkit') return webkit.launch({ headless: false })
  return chromium.launch({ headless: false })
}

function readExcelFile(filePath) {
  const resolvedFilePath = path.resolve(filePath)
  if (!fs.existsSync(resolvedFilePath)) {
    throw new Error(`Excel file not found: ${resolvedFilePath}`)
  }
  const workbook = xlsx.readFile(resolvedFilePath, { cellDates: true, raw: false })
  const sheetName = workbook.SheetNames[0]
  if (!sheetName) {
    throw new Error(`Excel file has no worksheet: ${resolvedFilePath}`)
  }
  return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' })
}

function validateRows(rows) {
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('Excel file contains no rows to execute.')
  }
  const missingStepAction = rows.some((row) => !row.StepAction && !row.stepAction && !row.action)
  if (missingStepAction) {
    throw new Error('Every row in the Excel file must include a StepAction column.')
  }
  const hasValidUrl = rows.some((row) => row.WebsiteURL || row.websiteurl || row.websiteURL)
  if (!hasValidUrl) {
    throw new Error('At least one row in the Excel file must provide a WebsiteURL value.')
  }
}

function normalizeRow(row) {
  return {
    testCase: row.TestCase || row.testCase || row.Testcase || 'Default',
    websiteUrl: row.WebsiteURL || row.websiteurl || row.websiteURL || '',
    stepAction: (row.StepAction || row.stepAction || row.Action || row.action || '').toString().trim(),
    selector: row.Selector || row.selector || '',
    value: row.Value || row.value || row.TestData || row.testData || '',
    notes: row.Notes || row.notes || ''
  }
}

function inferAction(stepAction) {
  return stepAction.toString().trim().toLowerCase().replace(/\s+/g, '')
}

async function runStep(page, row, currentUrl) {
  const action = inferAction(row.stepAction)
  const selector = row.selector || ''
  const value = row.value || ''

  switch (action) {
    case 'open':
    case 'navigate':
      if (!row.websiteUrl && !value) {
        throw new Error('Open step requires a WebsiteURL or Value column.')
      }
      return page.goto(row.websiteUrl || value)

    case 'click':
      if (!selector) throw new Error('Click step requires a Selector column.')
      return page.click(selector)

    case 'fill':
      if (!selector) throw new Error('Fill step requires a Selector column.')
      return page.fill(selector, value)

    case 'select':
      if (!selector) throw new Error('Select step requires a Selector column.')
      return page.selectOption(selector, { value })

    case 'press':
      if (!selector) throw new Error('Press step requires a Selector column.')
      return page.press(selector, value || 'Enter')

    case 'hover':
      if (!selector) throw new Error('Hover step requires a Selector column.')
      return page.hover(selector)

    case 'wait':
      return page.waitForTimeout(Number(value) || 1000)

    case 'waitforselector':
      if (!selector) throw new Error('WaitForSelector step requires a Selector column.')
      return page.waitForSelector(selector, { timeout: 15000 })

    case 'asserttitlecontains':
    case 'asserttitle': {
      const title = await page.title()
      if (!title.includes(value)) {
        throw new Error(`Expected title to contain '${value}', but got '${title}'.`)
      }
      return
    }

    case 'asserttextcontains':
    case 'asserttext': {
      if (!selector) throw new Error('AssertText step requires a Selector column.')
      const content = await page.textContent(selector)
      if (!content || !content.includes(value)) {
        throw new Error(`Expected element ${selector} text to contain '${value}', but got '${content}'.`)
      }
      return
    }

    case 'asserturlcontains': {
      const url = page.url()
      if (!url.includes(value)) {
        throw new Error(`Expected URL to contain '${value}', but got '${url}'.`)
      }
      return
    }

    case 'screenshot':
      return page.screenshot({ path: value || `agent-screenshot-${Date.now()}.png`, fullPage: true })

    case 'scrollintoview':
      if (!selector) throw new Error('ScrollIntoView step requires a Selector column.')
      return page.locator(selector).scrollIntoViewIfNeeded()

    default:
      console.warn(`Skipping unsupported StepAction: ${row.stepAction}`)
  }
}

async function runExcelAgent(excelPath, browserName) {
  const rawRows = readExcelFile(excelPath)
  validateRows(rawRows)
  const rows = rawRows.map(normalizeRow)
  const groups = rows.reduce((acc, row) => {
    const key = row.testCase || 'Default'
    acc[key] = acc[key] || []
    acc[key].push(row)
    return acc
  }, {})

  const browser = await openBrowser(browserName)
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    for (const testCaseName of Object.keys(groups)) {
      const testRows = groups[testCaseName]
      console.log(`\nStarting test case: ${testCaseName}`)
      let currentUrl = ''
      for (const row of testRows) {
        if (row.websiteUrl) currentUrl = row.websiteUrl
        console.log(`  Step: ${row.stepAction} | Selector: ${row.selector || '-'} | Value: ${row.value || '-'} | URL: ${row.websiteUrl || currentUrl || '-'}`)
        await runStep(page, row, currentUrl)
      }
      console.log(`Completed test case: ${testCaseName}`)
    }
  } finally {
    await browser.close()
  }
}

async function runUrlAgent(url, browserName) {
  const browser = await openBrowser(browserName)
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    console.log(`Opening website: ${url}`)
    await page.goto(url)
    console.log(`Website opened: ${await page.title()}`)
    await page.screenshot({ path: 'agent-url-launch-screenshot.png', fullPage: true })
    console.log('Saved screenshot: agent-url-launch-screenshot.png')
  } finally {
    await browser.close()
  }
}

async function run() {
  const args = parseArgs()
  if (args.help || (!args.url && !args.excel)) {
    console.log(USAGE)
    process.exit(args.help ? 0 : 1)
  }

  const browserName = normalizeBrowserName(args.browser)
  if (args.excel) {
    await runExcelAgent(args.excel, browserName)
  } else {
    await runUrlAgent(args.url, browserName)
  }
}

run().catch((error) => {
  console.error('ERROR:', error.message)
  process.exit(1)
})
