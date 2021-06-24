const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  operador: String,
  supervisor: String,
  cli_nome:  String,
  cli_cpf: String,
  cli_data_nasc: String,
  ENDERECO: String,
  BAIRRO: String,
  CIDADE:  String,
  UF_ENDERECO: String,
  CEP: String,
  contato1: String,
  contato2: String,
  cli_matricula: String,
  Banco: String,
  Agencia_Pagto: String,
  especie: String,
  contacorrente: String,
  meiopagto: String,
  info1: String,
  info2: String,
  info6: String,
  info3: String,
  info5: String,
  info8: String,
  info9: String,
  status: String,
  obs: String,
  url: String,
  anexo: String,
  created_at: {type: Date, default: Date.now}


})

module.exports = mongoose.model('Client', clientSchema)