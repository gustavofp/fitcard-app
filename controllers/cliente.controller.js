const Cliente = require('../models/cliente')


const createCliente = (req, res) => {

        Cliente.create({
                cnpj: req.body.cnpj,
                razao_social: req.body.razao_social,
                nome_fantasia: req.body.nome_fantasia,
                endereco: req.body.endereco,
                cidade: req.body.cidade,
                estado: req.body.estado,
                email: req.body.email,
                telefone: req.body.telefone,
                status: req.body.status,
                categoria: req.body.categoria,
            }, (err, clientes) => {
                if (err){
                    res.send(err);
                }else {
                    // retorna lista de clientes
                    Cliente.find((err, clientes) => {
                        if (err)
                            res.send(err)
                        res.json(clientes);
                    });
                }
            });
}

const updateCliente = (req, res) => {
    Cliente.findById(req.params.id, (err, cliente) => {
            if (cliente){
                cliente.cnpj = req.body.cnpj
                cliente.razao_social = req.body.razao_social
                cliente.nome_fantasia = req.body.nome_fantasia
                cliente.endereco = req.body.endereco
                cliente.cidade = req.body.cidade
                cliente.estado = req.body.estado
                cliente.email = req.body.email
                cliente.telefone = req.body.telefone
                cliente.status = req.body.status
                cliente.categoria = req.body.categoria

                cliente.save(err => {
                    if (err){
                    res.send(err);
                    }else {
                        // retorna lista de clientes
                        Cliente.find((err, clientes) => {
                            if (err)
                                res.send(err)
                            res.json(clientes);
                        });
                    }
                })
            }
                
        });
}

const deleteCliente = (req, res) =>  {
    Cliente.remove({
            _id : req.params.id
        }, (err, cliente) => {
            if (err){
                res.send(err);
            }else {
                // retorna lista de clientes
                Cliente.find((err, clientes) => {
                    if (err)
                        res.send(err)
                    res.json(clientes);
                });
            }
        });
}

const getCliente = (req, res) => {
        Cliente.find((err, clientes) => {
            if (err)
                res.send(err)
            res.json(clientes); 
        });
}


module.exports = { createCliente, deleteCliente, getCliente, updateCliente }
