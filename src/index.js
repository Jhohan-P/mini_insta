require('dotenv').config()
const express = require('express');
const app = express();

const usuarioRotas = require('./routes/usuarioRota')
const loginRota = require('./routes/loginRota')
const posntagemRota = require('./routes/posntagemRota')

app.use(express.json());


app.use('/login', loginRota);
app.use('/cadastro', usuarioRotas);
app.use('/perfil', usuarioRotas);
app.use('/postagem', posntagemRota);
// app.use('/curtir',);
// app.use('/comentar')


app.listen(process.env.PORT, console.log(process.env.PORT))