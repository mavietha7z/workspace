const puppeteer = require('puppeteer');
const generateRandomNumber = require('../src/function');

const url = 'https://garenafreefiremax.vn/';

async function startProject() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    // Vì website chặn devtools nên phải tắt javascript mới truy cập được
    await page.setJavaScriptEnabled(false);
    await page.goto(url);

    // Chọn thẻ select với id="type"
    await page.waitForSelector('#type');
    await page.select('#type', 'VIETTEL');

    // Chọn thẻ select với id="amount"
    await page.waitForSelector('#amount');
    await page.select('#amount', '1000000');

    // Nhập 14 số ngẫu nhiên
    await page.waitForSelector('#serial');
    const randomSerial = generateRandomNumber(14);
    await page.type('#serial', randomSerial);

    // Nhập 15 số ngẫu nhiên
    await page.waitForSelector('#pin');
    const randomCode = generateRandomNumber(15);
    await page.type('#pin', randomCode);

    // Nhập 8 số ngẫu nhiên
    await page.waitForSelector('[name="idgame"]');
    const randomID = generateRandomNumber(8);
    await page.type('[name="idgame"]', randomID);

    // Nhấn nút

    // await page.waitForSelector('#napthe');
    // await page.evaluate(() => document.getElementById('napthe').submit());
    await page.waitForSelector('#napthe');
    const form = await page.$('#napthe');
    await form.evaluate(() => this.dispatchEvent(new Event('submit')));

    // await page.submitForm('#submit');
    // await page.waitForNavigation();

    // Xuất thông báo
    await page.waitForSelector('#swal2-html-container', { timeout: 60000 });
    const message = await page.$eval('#swal2-html-container', (element) => element.textContent);
    console.log('message: ', message);

    // Đóng trình duyệt
    await browser.close();
}

module.exports = startProject;
