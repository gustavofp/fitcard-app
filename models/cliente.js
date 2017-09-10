var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = new Schema({
    cnpj: { type: String, required: true, unique: true },
    razao_social: { type: String, required: true },
    nome_fantasia: String,
    email: String,
    endereco: String,
    cidade: String,
    estado: String,
    telefone: String,
    data_cadastro: { type: Date, default: Date.now },
    categoria: String,
    status: Boolean, 
});


module.exports = mongoose.model('Cliente', ClienteSchema);

