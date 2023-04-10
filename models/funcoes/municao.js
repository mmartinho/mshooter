/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Exporta o objeto da classe de métodos estáticos que manipulam os objetos 
 *          do modelo sequelize "Municao" associada a um Esportista
 *          @see models\funcoes\do-esportista.js
 ************************************************************************************/
const DoEsportista = require('./do-esportista');

class Municao extends DoEsportista {
    
}

const municaoDoEsportista = new Municao('Municao');

module.exports = municaoDoEsportista;