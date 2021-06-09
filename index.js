const express = require('express');
const puppeteer = require('puppeteer');

const server = express();

server.get('/', (req,res) => {
  ;(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/');

    
    
    
    await page.click('[aria-label="Fazer login"]');
    await page.waitForNavigation()
    await page.type('input[autocomplete="username"]', "icestonebruno@gmail.com")

    await page.click('div.VfPpkd-RLmnJb');
      
    // await page.waitForNavigation()
    // const Projects = await page.evaluate(() => {

    //   var test = document.querySelector('a[href="/new"]').innerText;
    //   // console.log(test)

    //   // test = Array.prototype.slice.call(test)    
    //   // test = test.map(e => {
    //   //     console.log("1:",e.innerText)
    //   // })

      
    //   return {
    //     first: test
    //   };


    // });
    
    //await browser.close();
    res.send({
      "1 Video" : ''
    })

  })();



})



server.listen(3000, () => console.log('rodando'))

// //await page.waitForNavigation()