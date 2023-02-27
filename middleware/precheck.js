const InvalidArgumentError = require('../shared/errors/invalid-argument');

class PrecheckMiddleware {
    static async verificacaoBody(req, res, next) {
        try {
            const { body }  = req;
            const ids = [
                'insumo_id','municao_id','movimentacao_id',
                'documento_id','comunicacao_id','local_id',
                'pce_id','compra_id','apostilamento_id'
            ];
            var message='';
            if(body) {
                ids.forEach(id => {
                    if(body.hasOwnProperty(id)) {
                        message = new InvalidArgumentError(`Propriedade ${id} não é permitida no corpo da requisição`).message;
                    }
                });
                if(message) {
                    return res.status(409).json({message});
                }
            }
            return next();
        } catch (error) {            
            return res.status(500).json({message: error.message});
        }
    }

}

module.exports = PrecheckMiddleware;