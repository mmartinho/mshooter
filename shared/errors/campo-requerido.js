/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe extendida de Error de campo requerido
 ************************************************************************************/
class CampoRequeridoError extends Error {
    constructor(message='') { 
        super(message ? message : 'Campo requerido');
        this.name = 'CampoRequerido';
        this.code = 400;
    }
}

module.exports = CampoRequeridoError;