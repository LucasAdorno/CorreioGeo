const puppeteer = require('puppeteer-core');
const connection = require('../database/connection.js');

const scrape = async (BOnumber) => {
  const browser = await puppeteer.launch({
   headless: false,
    executablePath: '/opt/google/chrome/google-chrome'
  });

  const page = await browser.newPage()

  await page.goto(`http://200.187.8.90/boletim-stelecom/?bo_cod=${BOnumber}`);

  await page.waitFor('tbody > .corUm', {
    timeout: 3000
  });

  const result = await page.evaluate(() => {
    let crimeInfos = {};
    let register = [];
    let report = [];

    let history = document.querySelectorAll('tbody > .corUm')

    history.forEach(item => {
      return item.childElementCount === 6 ? register.push(item) : false;
    })

    register.forEach(item => {
      crimeInfos = {
        nome: item.children[0].innerText,
        sexo: item.children[1].innerText,
        idade: item.children[2].innerText,
        adressOne: item.children[3].innerText,
        adressTwo: item.children[4].innerText,
        data: item.children[5].innerText,
        crime_id: Math.random()*123842
      }
      report.push(crimeInfos)
    })
    return report
  })
  browser.close()
  return result
};

let BOnumber = 3839;

scrape(BOnumber).then(value => {
  value.forEach(async item => {
    let {  nome, sexo, idade, adressOne, adressTwo, data, crime_id } = item;

    console.log(item);

    await connection('crimes')
      .insert({
        nome, 
        sexo, 
        idade, 
        adressOne, 
        adressTwo, 
        data: data.split(' ')[0],
        hora: data.split(' ')[1], 
        crime_id
      })
  })
})
