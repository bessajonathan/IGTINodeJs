const express = require('express');
const app = express();
const rotas = require('./Rotas');
const dados = require('./Dados');

app.use(express.json());
app.use(rotas);

app.listen(3000, () => {
    dados();
    console.log('API Inicializada');
});