const express = require('express');
const cadastrarUsuario = require('../controllers/cadastrarUsuario');

const rotas = express.Router()

rotas.post('/', cadastrarUsuario)
// rota de cadastro
rotas.get('/',)
// rota para detalhar o perfil
rotas.post('/',)
// atulizar perfil

module.exports = rotas