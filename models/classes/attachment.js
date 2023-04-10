/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe que representa um anexo de aquivo temporário
 ************************************************************************************/
class Attachment {
    constructor(filename, content='', path='') {
        this.filename = filename;
        if(content) {this.content = content};
        if(path) {this.path = path};
    }
}

module.exports = Attachment;