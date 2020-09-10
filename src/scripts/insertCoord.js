require('dotenv/config.js');
const axios = require('axios');
const connection = require('../database/connection');

const api = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode/json?region=br&language=pt-BR&address='
})

async function list() {
   
    const users = await connection('crimes')
        .select('adressOne', 'adressTwo', 'crime_id')

    users.map(item => {
        let query = `${item.adressTwo.split(',')[0].toLowerCase()} ${item.adressOne.toLowerCase()} bahia brasil`;
        query = query.replace(/ /g, '%20');
        api.get(`${query}&key=${process.env.API_KEY}`)
            .then(res => console.log(res.data.results[0]))
            .catch(() => console.log(`ERR`))
    })
}

list();





