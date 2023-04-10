const express = require('express');
const novaPostagem = require('../controllers/cadastrarPostagem');
const verificacaoDoToken = require('../middlewares/validacaoToken');
const curtir = require('../controllers/curtirFoto');
const registrarComentario = require('../controllers/comentarPostagem');
const feed = require('../controllers/mostrarFeed');

const rotas = express.Router()

rotas.use(verificacaoDoToken)

rotas.post('/', novaPostagem)
rotas.get('/', feed)
rotas.post('/:postagemId/curtir', curtir)
rotas.post('/:postagemId/comentar', registrarComentario)

module.exports = rotas