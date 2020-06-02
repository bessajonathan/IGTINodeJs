const express = require('express');
const fs = require('fs');
const path = require('path');
const estados = require('./data/Estados.json');
const cidades = require('./data/Cidades.json');
const rota = new express.Router();

rota.get('/nomeMenorCidade', (req, res) => {
    const dados = retornaNomeMenorCidade();
    res.send(dados);
});

rota.get('/nomeMaiorCidade', (req, res) => {
    const dados = retornaNomeMaiorCidade();
    res.send(dados);
});

rota.get('/estadoMenosPopulosos', (req, res) => {
    const dados = retornaEstadosMenosPopulosos();
    res.send(dados);
});

rota.get('/menoresNomes', (req, res) => {
    const dados = retornaCidadesDeMenorNome();
    res.send(dados);
});

rota.get('/maioresNomes', (req, res) => {
    const dados = retornaCidadesDeMaiorNome();
    res.send(dados);
});

rota.get('/estadoMaisPopulosos', (req, res) => {
    const dados = retornaEstadosMaisPopulosos();
    res.send(dados);
});

rota.get('/estado/:UF', (req, res) => {
    const { UF } = req.params;
    const dados = leEstado(UF.toUpperCase());
    res.send(`${UF} possui ${dados.length} cidades`);
});


function retornaNomeMenorCidade() {
    let arrayCidades = retornaCidadesDeMenorNome();

    arrayCidades = arrayCidades.sort((a, b) => {
        return a.Nome.length - b.Nome.length;
    })

    return arrayCidades[0];
};

function retornaNomeMaiorCidade() {
    let arrayCidades = retornaCidadesDeMaiorNome();

    arrayCidades = arrayCidades.sort((a, b) => {
        return b.Nome.length - a.Nome.length;
    })

    return arrayCidades[0];
}

function leEstado(UF) {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '/data/UF/', `${UF}.json`)));
};

function retornaCidadesDeMenorNome() {
    let arrayDeCidades = [];
    const estado = estados.map(estado => {
        const { Sigla } = estado;

        const cidadesDoEstado = fs.readFileSync(path.join(__dirname, '/data/UF/', `${Sigla}.json`));
        let json = JSON.parse(cidadesDoEstado);

        json = json.sort((a, b) => {
            return a.Nome.length - b.Nome.length;
        })

        let obj = {
            Nome: json[0].Nome,
            UF: Sigla
        }

        arrayDeCidades.push(obj);
    })

    return arrayDeCidades;
};

function retornaCidadesDeMaiorNome() {
    let arrayDeCidades = [];
    const estado = estados.map(estado => {
        const { Sigla } = estado;

        const cidadesDoEstado = fs.readFileSync(path.join(__dirname, '/data/UF/', `${Sigla}.json`));
        let json = JSON.parse(cidadesDoEstado);

        json = json.sort((a, b) => {
            return b.Nome.length - a.Nome.length;
        })

        let obj = {
            Nome: json[0].Nome,
            UF: Sigla
        }

        arrayDeCidades.push(obj);
    })

    return arrayDeCidades;
};

function retornaEstadosMaisPopulosos() {
    const novoArray = estados.map(estado => {
        const { Sigla, ID } = estado;

        let cidadesFiltradas = cidades.filter(cidade => cidade.Estado === ID);

        return {
            Estado: `${Sigla}`,
            Cidades: `${cidadesFiltradas.length}`
        }

    })

    novoArray.sort((a, b) => {
        return b.Cidades - a.Cidades;
    })

    return novoArray.slice(0, 5);
};

function retornaEstadosMenosPopulosos() {
    const novoArray = estados.map(estado => {
        const { Sigla, ID } = estado;

        let cidadesFiltradas = cidades.filter(cidade => cidade.Estado === ID);

        return {
            Estado: `${Sigla}`,
            Cidades: `${cidadesFiltradas.length}`
        }

    })

    novoArray.sort((a, b) => {
        return a.Cidades - b.Cidades;
    })

    const estadosMenores = novoArray.slice(0, 5);

    estadosMenores.sort((a, b) => {
        return b.Cidades - a.Cidades;
    })

    return estadosMenores;
};

module.exports = rota;