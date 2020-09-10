require('dotenv/config.js');
const axios = require('axios');
const connection = require('../database/connection');

const api = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode/json?address='
})
let x = 0;
let y = 0;
async function list() {
   
    const users = await connection('crimes')
        .select('adressOne', 'adressTwo', 'crime_id')

    users.map(item => {
        x++;
        let query = `${item.adressTwo.split(',')[0]} Bahia`;
        query = query.replace(/ /g, '+');
        console.log(query)
        api.get(`${query}&key=${process.env.API_KEY}`)
            .then(res => {
                y++;
                return console.log(res.data.results[0], y)})
            .catch(err => console.log('err'))
        console.log(x);
    })
}

list();





