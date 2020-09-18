const connection = require('../database/connection');

module.exports = {
  async index(request, response) {

    let crimes = await connection('crimes')
      .select('*')
    crimes = crimes.filter(item => item.latitude !== null && item.estado === 'Bahia')
    console.log(crimes.length)
    return response.json(crimes)

  },

  async create(request, response) {

  }
}