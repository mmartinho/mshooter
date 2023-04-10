/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe de métodos estáticos "Auxiliar"
 ************************************************************************************/
class Auxiliar {
    static isEmpty(obj) {
        return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype
    }
}

module.exports = Auxiliar;

