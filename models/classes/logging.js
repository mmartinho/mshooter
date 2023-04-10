/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe responsável por lidar com transportes (arquivo ou console) de 
 *          registro de LOG
 ************************************************************************************/
const winston = require('winston');
const logPath = __basedir + `/${process.env.LOGS_DIR}/`;

class Logging {
    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.simple(),
            defaultMeta: {service: 'Backend mShooter Logger'}
        });
        if(process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console());
        } else {
            this.logger.add(new winston.transports.File({filename: this.timeFile()}));
        }
    }

    /** 
     * @returns string
     */
    timeFile() {
        var date_ob = new Date();
        var day = ("0" + date_ob.getDate()).slice(-2);
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var year = date_ob.getFullYear();
        return `${logPath}${day}-${month}-${year}.log`;
    }

    /**
     * @param string level 
     * @param string message 
     */
    write(level, message) {
        this.logger.log(level, message);
    }

}

module.exports = Logging;