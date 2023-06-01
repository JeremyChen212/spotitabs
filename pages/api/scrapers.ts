const puppeteer = require('puppeteer')
async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
}

scrapeProduct('https://www.ultimate-guitar.com/')