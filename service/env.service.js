const dotenv = require('dotenv').config({ path: './lib/.env' });

class envService {
    constructor(){}

    getEnvVar(_envVar){
        if (process.env[_envVar]) {
            return process.env[_envVar]
        } else {
            const logger = require('../utility/log');
            logger.LogError("Environment Variable Not found")
            return null
        }
    }
}

module.exports = new envService()