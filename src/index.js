const express = require('express');
const app = express();
require('dotenv').config()

const usuarioRotas = require('./routes/usuarioRota')

app.use(express.json());


app.use('/login',);
app.use('/cadastro', usuarioRotas);
app.use('/perfil',);
app.use('/postagens',);
app.use('/curtir',);
app.use('/comentar')

app.listen(process.env.PORT)