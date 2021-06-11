const knex = require('../model/index')

knex()

module.exports = {
  async register(req, res){

    knex()
    return res.render('register')
  },
  save (req,res){



    return res.send('SALVO')
  }


}