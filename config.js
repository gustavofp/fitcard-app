const mongoose = require('mongoose');
const urlString = 'mongodb://fitcard:fitcard@ds133104.mlab.com:33104/fitcard';

mongoose.connect(urlString, (err, res) => {
    let str;
    err ? str = "Não foi possível conectar ao mongoDB" : str = "Conexão iniciada"
    console.log(str)
});
