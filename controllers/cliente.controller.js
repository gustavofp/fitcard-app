const Cliente = require('../models/cliente')


const createCliente = (req, res) => {
    
    if(validarEmail(req.body.email) && validarCNPJ(req.body.cnpj)){
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
    }else{
        res.send('Erro no formulário, favor preencher o campo CNPJ/email corretamente.')
    }
}

const updateCliente = (req, res) => {
    Cliente.findById(req.params.id, (err, cliente) => {
        if(validarEmail(req.body.email) && validarCNPJ(req.body.cnpj)){
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
        }else{
            res.send('Erro no formulário, favor preencher o campo CNPJ/email corretamente.')
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

function validarEmail(email){
    var excluir=/[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/;
    var checar=/@[w-]+./;
    var checarFinal=/.[a-zA-Z]{2,3}$/;
    if(((email.search(excluir) != -1)||(email.search(checar)) == -1)||(email.search(checarFinal) == -1)){return false;}
    else {return true;}
}

function validarCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;

    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

module.exports = { createCliente, deleteCliente, getCliente, updateCliente }
