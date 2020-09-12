const connection = require('../database/connection');

module.exports = {
  async index(request, response) {

    const crimes = await connection('crimes')
      .select('*')

    return response.json(crimes)

  },

  async create(request, response) {

  }
}