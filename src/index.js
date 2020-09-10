import axios from 'axios';
import 'dotenv/config.js';

const api = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode/json?address='
})

const query = 'abrantes camacari bahia'
query.replace(' ', '%');

api.get(`${query}&key=${process.env.API_KEY}`)
    .then(res => console.log(res.data.results[0]))
    .catch(err => console.log(err))
