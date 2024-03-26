

# Recruitment Task Repository

## Description

This repository contains a task project for performing basic tests on puppy adoption site. 
It requires the latest version of Node.js to be installed.

## Installation

To install the repository, run the following command:

    npm install
    
## Running Tests

To run the all tests, use the following command:

	npm run test

To run specific scenario:

	npm run test:<scenario number>
	for example: npm run test:1

To run in headless mode combine WDIO_HEADLESS environment variable with aforementioned commands:

	WDIO_HEADLESS=TRUE npm run test:1
	
## Project structure
* test
	* pom             # **Page Object Models**
	* specs           # **Test Specifications**
	* utils             # **Utility Functions and Constants**


### Omissions
Please note that this project is not a full end-to-end test automation project, and some omissions have been made.

- **Assertions**: Only basic assertion tests are provided.
- **Multi-browser Support**: Testing on multiple browser is crucial.
- **Setup via API Calls**: The setup via API calls would greatly speed up test execution.
- **Configuration for Multiple Environments**
- **Linter and Formatter**


