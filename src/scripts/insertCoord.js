require('dotenv/config.js');
const axios = require('axios');
const connection = require('../database/connection');

const api = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode/json?region=br&language=pt-BR&address='
})
let required = []

async function list() {

    const users = await connection('crimes')
        .select('adressOne', 'adressTwo', 'crime_id')


    users.map(item => {
        let query = `${item.adressTwo.split(',')[0].toLowerCase()} ${item.adressOne.toLowerCase()} bahia brasil`;
        query = query.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        query = query.replace('°', '')
        console.log(query)

        api.get(`${query}&key=${process.env.API_KEY}`)
            .then(response => console.log(`[${response.data.results[0].geometry.location.lat}, ${response.data.results[0].geometry.location.lng}], `))
            .catch((err) => console.log('err'))
    })
}

list();





