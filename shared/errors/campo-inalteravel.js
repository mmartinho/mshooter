/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe extendida de Error de campo não passível de alteração
 ************************************************************************************/
class CampoInalteravelError extends Error {
    constructor(message='') { 
        super(message ? message : 'Campo não pode ser alterado');
        this.name = 'CampoInalteravel';
        this.code = 400;
    }
}

module.exports = CampoInalteravelError

