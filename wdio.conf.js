const headless = process.env.WDIO_HEADLESS && process.env.WDIO_HEADLESS.toUpperCase() === 'TRUE';

export const config = {
  runner: 'local',
  specs: [
    './test/specs/**/*.spec.js'
  ],
  maxInstances: 10,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      // Add Chrome options here
      args: [
        ...(headless ? ['--headless'] : []), // Include '--headless' option if headless is true
        '--start-maximized', // Start Chrome maximized
        '--disable-gpu', // Disable GPU hardware acceleration
        '--disable-dev-shm-usage', // Disable the use of /dev/shm
        '--no-sandbox' // Disable the sandbox for Docker
      ],
    }
  }],
  logLevel: 'warn',
  bail: 0,
  baseUrl: 'https://spartantest-puppies.herokuapp.com/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
}
