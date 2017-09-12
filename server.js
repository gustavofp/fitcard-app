const express = require('express');
const app = express();
const morgan = require('morgan');   
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('./config.js');
const clienteController = require('./controllers/cliente.controller.js');

const port = 8080;           

app.listen(port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

console.log(`Server rodando na porta ${port}`);

app.get('/api/clientes',(req, res) => {
    clienteController.getCliente(req, res)
})

app.post('/api/clientes',(req, res) => {
    console.log(req)
    clienteController.createCliente(req, res)
})

app.delete('/api/clientes/:id',(req, res) => {
    clienteController.deleteCliente(req, res)
})

app.put('/api/clientes/:id',(req, res) => {
    clienteController.updateCliente(req, res)
})

app.get('*', (req, res) => {
    res.sendfile('./public/index.html');
})
