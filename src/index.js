const express = require('express');
const app = express();
require('dotenv').config()


app.use(express.json());


app.use('/login',);
app.use('/cadastro',);
app.use('/perfil',);
app.use('/postagens',);
app.use('/curtir',);
app.use('/comentar')

app.listen(process.env.PORT)