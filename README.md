# Assignment 1: Singlish to Sinhala Transliteration Testing

This repository contains the Playwright test automation project for evaluating a Singlish-to-Sinhala chat translator. The script reads 50 chat-style Singlish test cases from an Excel file, inputs them into the web application, and automatically records the actual Sinhala output and the test status (Pass/Fail) back into the Excel sheet.

## Prerequisites

Before running the script, make sure you have the following installed on your machine:
- Python 3.11 or 3.12
- Google Chrome (Recommended)

## Setup & Installation

1. Download and extract the project folder.
2. Open your Command Prompt (CMD) or terminal and navigate to the extracted folder.
3. Update pip (optional but good practice):
   pip install -U pip

4. Install the required Python dependencies:
   pip install playwright openpyxl

5. Install the Playwright browsers:
   playwright install

## How to Run the Tests

Open your Command Prompt inside the project directory and run the following command. 

python IT23636842.py --excel "IT23636842.xlsx" --url "https://www.pixelssuite.com/chat-translator" --wait-ms 5000 --type-delay-ms 80 --slow-mo-ms 200 --save-every 1 --keep-open

## Project Structure

- IT23636842.py : The main Python script that runs the Playwright automation.
- IT23636842.xlsx : The Excel file containing the 50 test scenarios. The script will write the actual results directly into this file.
- README.md : Setup and execution instructions.