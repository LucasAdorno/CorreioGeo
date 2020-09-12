require('dotenv/config.js');
const axios = require('axios');
const connection = require('../database/connection');

const api = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode/json?region=br&language=pt-BR&address='
})

async function list() {

    const crimes = await connection('crimes')
        .select('adressOne', 'adressTwo', 'crime_id')


    crimes.map(item => {
        let query = `${item.adressTwo.split(',')[0].toLowerCase()} ${item.adressOne.toLowerCase()} bahia brasil`;
        query = query.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        query = query.replace('°', '')
        console.log(query)

        api.get(`${query}&key=${process.env.API_KEY}`)
            .then(async response => {
                let data = response.data.results[0];
                let address;
                let latitude = data.geometry.location.lat; 
                let longitude = data.geometry.location.lng;
                let bairro = 'NI';
                let cidade = 'NI';

                console.log(longitude);

                address = data.address_components;
                address.map(i => {
                    if (bairro === 'NI') {
                        bairro = i.types[1] === 'sublocality' ? i.long_name : 'NI'
                    }
                    if (cidade === 'NI') {
                        cidade = i.types[0] === 'administrative_area_level_2' ? i.long_name : 'NI'
                    }
                })
                await connection('crimes')
                    .where('crime_id', item.crime_id)
                    .update({
                        bairro,
                        city: cidade,
                        latitude,
                        longitude
                    })
            })
            .catch((err) => console.log(err))
    })
}

list();





