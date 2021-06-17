const puppeteer = require('puppeteer');
require('dotenv').config()

let bot = async (cpf) => {
  //INICIANDO O NAVEGADOR
  const browser = await puppeteer.launch({slowMo: 60});
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation({waitUntil: "domcontentloaded"});
  await page.goto('http://www.sigplay.net/admin/welcome.php');
  await navigationPromise;
    //LOGIN NO SISTEMA
  await page.type('input[type="text"]', process.env.DB_USER)
  await page.type('input[type="password"]', process.env.DB_PASS)
  await page.click('[type="submit"]');
  //NAVEGANDO ATÉ A PAGINA ONDE SERÁ FEITO A CONSULTA
  await page.goto('http://www.sigplay.net/admin/ope_contato.php?balcao');
  //ESCOLHENDO A OPÇÃO CPF
  await navigationPromise;
  await page.waitForSelector('div').then((value) => console.log('consulta1')).catch((erro) => console.log('erro consulta1'));     
  await navigationPromise;
  await page.waitForSelector('input').then((value) => console.log('consulta2')).catch((erro) => console.log('erro consulta2'));     
  await page.click('[name="convenio"]');
  await page.keyboard.press('ArrowDown');


  //FAZENDO A CONSULTA DO CPF 
  await page.type('input[name="cpf"]', cpf)
  await page.click('button.pesquisar_dados')
  await page.click('button[type="submit"]')

  //NAVEGANDO ATÉ A PAGINA COM OS DADOS
  await navigationPromise;
  await page.waitForSelector('form').then((value) => console.log('consulta3')).catch((erro) => console.log('erro consulta3'));     
  await navigationPromise;
  await page.waitForSelector('div').then((value) => console.log('consulta4')).catch((erro) => console.log('erro consulta4'));     
  

  //PEGANDO TODOS OS VALORES DENTRO DOS INPUTS Q NÃO ESTEJAM SENDO IGNORADOS
  let listValues = await page.evaluate(() => {
    let el = document.querySelectorAll('input:not([ignorar="true"]')
    let test = [...el]
    const result = test.map((a) => (`${[a.getAttribute('name')]}: ${a.value}`));

    return result
  });
  
  //SAINDO DO SISTEMA
  await page.goto('http://www.sigplay.net/admin/ope_contato.php?logout');
  await navigationPromise;
  await browser.close();
  return listValues
}


module.exports = bot