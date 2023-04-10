/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Exporta a instância da classe de métodos estáticos que manipulam os 
 *          objetos do modelo sequelize "Pce" associado a um Esportista
 *          @see models\funcoes\do-esportista.js
 ************************************************************************************/
const DoEsportista = require('./do-esportista');

class Pce extends DoEsportista {

}

const pceDoEsportista = new Pce('Pce');

module.exports = pceDoEsportista;