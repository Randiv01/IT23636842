# IT23636842
🧪 IT3040 – ITPM Assignment 1

Student ID: IT23636842

This project focuses on testing and automating a Singlish-to-Sinhala translation system using Playwright. The goal is to evaluate the system’s accuracy, robustness, and UI behavior across a wide variety of real-world language scenarios.

🎯 Assignment Objective

✔ Test the translation accuracy of Singlish inputs
✔ Identify incorrect or unexpected system behaviors
✔ Automate functional and UI test cases using Playwright
✔ Provide structured, repeatable, and well-documented test execution

The system under test:
🔗 Swift Translator – Singlish to Sinhala Translator

📁 Project Structure
```
assignment-1/
├── tests/
│   └── test.spec.ts          # All automated test cases
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies & scripts
├── README.md                 # Project documentation
├── test-results/             # Screenshots & execution artifacts
├── playwright-report/        # HTML test reports
└── Book1.xlsx                # Original test case documentation
```


✨ Test Suite Overview

Category	Count	Description

✅ Positive Functional Tests	34	Valid Singlish inputs that should translate correctly
❌ Negative Functional Tests	14	Invalid, unclear, or problematic inputs
🖥 UI Test Case	1	Verifies UI-related behavior
🐞 Debug Test	1	Helps inspect website structure

🧠 What Is Being Tested?
🗣 Language Coverage

Simple, compound, and complex sentences

Questions and commands

Positive & negative forms


💬 Daily Usage

Greetings and polite requests

Informal speech and common expressions


🔤 Word & Grammar Patterns

Multi-word expressions

Tense variations (past/present/future)

Singular/plural and pronoun use


🌐 Mixed Language

English technical terms inside Singlish

Place names and abbreviations


✏ Formatting & Symbols

Punctuation marks

Dates, times, currency

Extra spaces and line breaks


😎 Informal & Slang

Casual speech patterns

Colloquial Singlish variations


🚀 Getting Started
🔧 Prerequisites

Make sure you have installed:

Node.js (v16 or higher)

npm (comes with Node.js)

Check versions:
```
node -v
npm -v
```


📥 Installation Guide
1️⃣ Clone the Repository
```
git clone <your-repository-url>
cd assignment-1
```

2️⃣ Install Dependencies
```
npm install
```

3️⃣ Install Playwright Browsers
```
npx playwright install
```

You’re now ready to run the automated tests 🎉

🧪 Running the Tests
▶ Run All Tests
```
npx playwright test
```

🔍 Run Specific Test Types
```
# Only Positive Functional Tests
npx playwright test --grep "Pos_Fun"

# Only Negative Functional Tests
npx playwright test --grep "Neg_Fun"

# Specific Test Case
npx playwright test --grep "Pos_Fun_0001"

# Pattern-based execution
npx playwright test --grep "000[1-5]"
```

🖥 Run Tests with Browser Options
# Interactive UI mode
```
npx playwright test --ui

# Run with visible browser
npx playwright test --headed

# Debug mode (step-by-step)
npx playwright test --debug

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```


📊 Test Reports & Results

📁 Where Results Are Stored
Item	Location
HTML Report	```playwright-report/```
Screenshots	```test-results/```
Console Logs Terminal Output


📈 Generate HTML Report
```
npx playwright test --reporter=html
npx playwright show-report
```

⚙️ Framework Features

✨ Smart output comparison (handles minor variations)
📸 Automatic screenshots on failures
🧾 Detailed console logging
🔁 Retry logic for unstable tests
🌐 Multi-browser testing support


🧩 Test Design Structure

Each test follows this flow:
```
test('Test_ID - Test Name', async ({ page }) => {
  // 1. Load test data
  // 2. Navigate to translation website
  // 3. Enter Singlish input
  // 4. Capture translated output
  // 5. Compare with expected Sinhala output
  // 6. Log results
});
```


🐛 Troubleshooting
❗ Input Field Not Found

Run:
```
npx playwright test --grep "Debug"
```


Then update selectors in the helper function.

⏳ Timing Issues

Add waits inside the test:
```
await page.waitForTimeout(2000);
```
🌐 Browser Problems
```
npx playwright install --force
```
🔎 TypeScript Errors
```
npx tsc --noEmit
```

📚 References

Playwright Documentation

Playwright Test API

Assignment PDF

Provided Excel Test Case File
