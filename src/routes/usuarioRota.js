const express = require('express');
const cadastrarUsuario = require('../controllers/cadastrarUsuario');
const detalharPerfil = require('../controllers/detalharPerfil');
const verificacaoDoToken = require('../middlewares/validacaoToken');
const atualizarUsuario = require('../controllers/atualizarUsuario');

const rotas = express.Router()

rotas.post('/', cadastrarUsuario)

rotas.use(verificacaoDoToken)

rotas.get('/', detalharPerfil)
rotas.put('/', atualizarUsuario)


module.exports = rotas