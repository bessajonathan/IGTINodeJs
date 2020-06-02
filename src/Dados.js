const fs = require('fs');
const path = require('path');

const estados = require('./data/Estados.json');
const cidades = require('./data/Cidades.json');


function criaEstadosComCidades() {
    estados.map((estado) => {
        const { Sigla } = estado;

        const cidadesDoEstado = cidades.filter(
            (cidade) => cidade.Estado === estado.ID
        );

        const existe = fs.existsSync(
            path.join(__dirname, '/data/UF/', `${Sigla}.json`)
        );

        if (!existe) {
            fs.writeFile(
                path.join(__dirname, '/data/UF/', `${Sigla}.json`),
                JSON.stringify(cidadesDoEstado),
                'utf8',
                (err) => {
                    if (err) throw err;

                    console.log('Arquivo salvo');
                }
            );
        }
    });
}


module.exports = criaEstadosComCidades;