/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe de métodos estáticos que manipulam os objetos dos modelos 
 *          sequelize "Registro"
 *          Também utiliza métodos estáticos da classe "Documento"
 *          @see models\funcoes\documento.js
 ************************************************************************************/
const db = require('../../models');
const Documento = require('./documento');

class Registro {

    /**
     * @param integer esportista_id 
     * @param boolean temp
     * @returns {*} | null 
     */
    static async buscaPorId(esportista_id, documento_id, temp=false) {
        const registro = await db.Registro.findOne({where: {esportista_id: Number(esportista_id), documento_id : Number(documento_id)}});
        if(registro) {
            const documento = await Documento.buscaPorId(esportista_id, registro.documento_id, temp);
            if(documento) { 
                return { 
                    id: documento.id,
                    nome: documento.nome,
                    numero: documento.numero,
                    dt_expedicao: documento.dt_expedicao,
                    dt_validade: documento.dt_validade,
                    dt_registro: registro.dt_registro,
                    atividades: registro.atividades, 
                    arquivo : temp && documento.arquivo ? documento.arquivo : null
                };
            } else { 
                return null;
            }
        } else {
            return null
        }
    }

    /**
     * @param integer esportista_id 
     * @param integer tipo 
     * @param string dt_registro 
     * @param string dt_expedicao 
     * @param string dt_validade 
     * @param string nome 
     * @param string numero 
     * @param boolean temp 
     * @returns 
     */
    static async buscaPorCampos(esportista_id, tipo=null, dt_registro=null, temp=false) {
        let criteria = {where: {esportista_id: Number(esportista_id)}};
        if(tipo) {criteria.where.tipo = Number(tipo);}
        if(dt_registro) {criteria.where.dt_registro = dt_registro;}
        const registro = await db.Registro.findOne(criteria);
        if(registro) {
            const documento = await Documento.buscaPorId(esportista_id, registro.documento_id, temp);
            if(documento) { 
                return { 
                    id: documento.id,
                    nome: documento.nome,
                    numero: documento.numero,
                    dt_expedicao: documento.dt_expedicao,
                    dt_validade: documento.dt_validade,
                    dt_registro: registro.dt_registro,
                    atividades: registro.atividades, 
                    arquivo : temp && documento.arquivo ? documento.arquivo : null
                };
            } else { 
                return null;
            }
        } else {
            return null
        }
    }    

    /**
     * @param integer esportista_id 
     * @param integer documento_id 
     * @param string dt_registro 
     * @param string atividades 
     * @param integer tipo 
     * @returns Registro | null
     */
    static async criar(esportista_id, documento_id, dt_registro, atividades, tipo) {
        const registroCreated = await db.Registro.create({
            esportista_id: Number(esportista_id), 
            documento_id: Number(documento_id), 
            dt_registro,
            atividades,
            tipo: Number(tipo)
        })
        return registroCreated;
    }

    /**
     * @param integer esportista_id 
     * @param integer documento_id 
     * @param {*} dados 
     * @returns 
     */
    static async atualizar(esportista_id, documento_id, dados) {
        var registro = null;
        const criteria = {where: {esportista_id: Number(esportista_id), documento_id: Number(documento_id)}};
        const registroUpdated = await db.Registro.update(dados,criteria);
        if(registroUpdated) {
            registro = await db.Registro.findOne(criteria);
        }
        return registro;
    }

    /**
     * @param integer esportista_id 
     * @param string numero 
     * @param integer tipo 
     * @param string dt_validade 
     * @returns boolean
     */
    static async existe(esportista_id, numero, tipo, dt_validade) {
        const documento = await db.Documento.findOne({where: {esportista_id: Number(esportista_id), numero, dt_validade}});
        if(documento) {
            const registro = await db.Registro.findOne({where: { 
                esportista_id: Number(esportista_id), 
                documento_id: documento.id, 
                tipo: Number(tipo)
            }});
            return registro ? true : false;
        } else {
            return false;
        }
    }

    /**
     * @param integer esportista_id 
     * @param integer limit 
     * @param integer offset 
     * @returns 
     */
    static async lista(esportista_id, limit=null, offset=null) {
        var all = [];
        var total = 0;
        var criteria = { 
            where: { esportista_id: Number(esportista_id) }, 
            include: ['documentoSemConteudo'] 
        }             
        if(limit === null || offset === null) {
            all = await db.Registro.findAll(criteria);
            return all;            
        } else {
            criteria.limit = Number(limit);
            criteria.offset = Number(offset)
            await db.Registro.findAndCountAll(criteria).then((result)=> {
                all = result.rows;
                total = result.count;
            });
            return { model:'Registro', total, rows : all};            
        }            
    }     
}

module.exports = Registro;