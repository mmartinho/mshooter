const Compra = require('../models/funcoes/compra');

class CompraController {    

    /**
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async criar(req, res) {
        try {
            const { pce_id, esportista_id } = req.params;
            const { documento_id, dt_compra } = req.body;
            if(await Compra.existe(esportista_id, pce_id, documento_id)) {
                return res.status(409).json({
                    message: 
                        `Registro de compra feita pelo esportista ${esportista_id} ` +
                        `do PCE id ${pce_id} com documento id ${documento_id} já existe`
                });
            }
            const compraCreated = await Compra.criar(esportista_id, pce_id, documento_id, dt_compra); 
            const pce = await compraCreated.getPce();
            const documento = await compraCreated.getDocumento();
            const esportista = await compraCreated.getEsportista();
            return res.status(201).json({ 
                id: compraCreated.id,
                esportista: esportista.nome,
                pce: pce.nome, 
                documento: documento.nome,
                dt_compra : compraCreated.dt_compra
            });
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }      
  
}

module.exports = CompraController;