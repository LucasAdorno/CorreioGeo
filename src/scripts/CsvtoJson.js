const csvFilePath = `${__dirname}/../milvidas_last_949.csv`
const csv = require('csvtojson')
const connection = require('../database/connection');

csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    jsonObj.map(async item => {
      let {DATA, BAIRRO, SEXO, IDADE, NOME, CIDADE, ENDERECO } = item;
      await connection('crimes').insert({
        nome: NOME,
        sexo: SEXO,
        idade: IDADE,
        cidadedb: CIDADE,
        bairrodb: BAIRRO,
        data: DATA,
        enderecodb: ENDERECO,
        crime_id: Math.random()*123842
      })
    })
})