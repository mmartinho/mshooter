const Documento = require('../models/funcoes/documento');

class DocumentoController {    

    /**
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async criar(req, res) {
        try {
            const { nome, descricao, numero, dt_expedicao, dt_validade, arquivo } = req.body;
            if(!(nome && numero)) {
                return res.status(400).json({message: 'Nome e número são campos requeridos' });
            }            
            if(await Documento.existe(numero)) {
                return res.status(409).json({message: `Documento número ${numero} já existe`});
            }
            const documentoCreated = await Documento.criar(nome, descricao, numero, dt_expedicao, dt_validade, arquivo); 
            return res.status(201).json({ 
                id: documentoCreated.id,
                nome: documentoCreated.nome,
                descricao : documentoCreated.descricao,
                numero : documentoCreated.numero,
                dt_expedicao : documentoCreated.dt_expedicao,
                dt_validade : documentoCreated.dt_validade,
                arquivo : documentoCreated.arquivo
            });
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }    
    
    /**
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const newData = req.body;
            const updatedOne = await Documento.atualizar(id, newData); 
            return res.status(200).json(updatedOne);            
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }

    /**
     * List all Model objects with no criteria
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns Model[] | string
     */
     static async lista(req, res) {
        const model = CRUDController.modelFromUrl(req.url);
        console.log(model);
        try {
            const all = await db[model].findAll();
            return res.status(200).json(all);
        } catch (error) {
            return res.status(500).json({ message: error.message }); 
        }
    }    
  
}

module.exports = DocumentoController;