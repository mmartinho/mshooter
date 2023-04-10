/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Exporta a instância da classe de métodos estáticos que manipulam os 
 *          objetos do modelo sequelize "Insumo" associado a um Esportista
 *          @see models\funcoes\do-esportista.js
 ************************************************************************************/
const DoEsportista = require('./do-esportista');

class Insumo extends DoEsportista {
    
}

const insumoDoEsportista = new Insumo('Insumo');

module.exports = insumoDoEsportista;