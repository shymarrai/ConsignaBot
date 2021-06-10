const puppeteer = require('puppeteer');
require('dotenv').config()

let bot = async () => {
  const browser = await puppeteer.launch({headless: false, slowMo: 50,});
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation({waitUntil: "domcontentloaded"});
  await page.goto('http://www.sigplay.net/admin/welcome.php');
  await navigationPromise;
    //LOGIN NO SISTEMA
  await page.type('input[type="text"]', process.env.DB_USER)
  await page.type('input[type="password"]', process.env.DB_PASS)
  await page.click('[type="submit"]');
  
  await page.goto('http://www.sigplay.net/admin/ope_contato.php?balcao');
  
  await navigationPromise;
  await page.waitForSelector('div').then((value) => console.log('oshi')).catch((erro) => console.log('erou'));     
  await page.click('[name="convenio"]');
  await page.keyboard.press('ArrowDown');



  await page.type('input[name="cpf"]', process.env.DB_CPF)
  await page.click('button.pesquisar_dados')
  await page.click('button[type="submit"]')
  await navigationPromise;

  //TESTES DE CASO
  console.log('saí')
  await page.screenshot({ path: 'example.png' });
  await navigationPromise;

  //SAINDO DO SISTEMA
  // await page.goto('http://www.sigplay.net/admin/ope_contato.php?logout');
  // await browser.close();

}

module.exports = bot