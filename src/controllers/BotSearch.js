const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config()
const util = require('util')
util.inspect.defaultOptions.maxArrayLength = null;



let bot = async (cpf) => {
  //INICIANDO O NAVEGADOR
  const browser = await puppeteer.launch({headless: false,slowMo: 60});
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
  

  await page.click('a.moreinfo')
  await page.waitForSelector('div').then((value) => console.log('form aberto1')).catch((erro) => console.log('erro consulta4'));     
  await navigationPromise;
  await page.waitForSelector('table').then((value) => console.log('form aberto2')).catch((erro) => console.log('erro consulta4'));     
  await navigationPromise;





  //PEGANDO TODOS OS VALORES DENTRO DOS INPUTS Q NÃO ESTEJAM SENDO IGNORADOS
  let listValues = await page.evaluate(() => {
    let inputs = document.querySelectorAll('input:not([ignorar="true"]')
    let tels = document.querySelectorAll('strong')


    let responseInputs = [...inputs]
    let responseTels = [...tels]
    var c = 0;

    // const result = test.map((a) => (`${a.value}`));
    const result = responseInputs.map((a) => (String([a.getAttribute('name')])+':'+String(a.value)));


    const telefones = responseTels.map((a) => {
      c++
      return (`contato${c}: `+a.innerText)
    });


    return result.concat(telefones)
  });






  // EVAL PARA PEGAR OS DADOS DO MODAL**********************************
  let dataModal = await page.evaluate(() => {
    let modals = document.querySelectorAll('.modal-body table tbody tr:nth-child(1) td')

    let responseModals = [...modals]
    var c = 0;

    // const result = test.map((a) => (`${a.value}`));
    const dataTable = responseModals.map((a) => {
      c++
      return (`info${c}: ${a.innerText}`)
    });

    return dataTable
  });



  //SAINDO DO SISTEMA
  await navigationPromise;
  await page.goto('http://www.sigplay.net/admin/ope_contato.php?logout');
  await browser.close();
  
  return listValues.concat(dataModal)
}


module.exports = bot