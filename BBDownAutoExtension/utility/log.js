const utility = require("./other"),
util = require('util'),
archiver = require('archiver'),
fs = require("fs"),
yargs = require('yargs'),
{ hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

const env = require('../service/env.service');

function extractCallMethod(trace) {
    let initiator = 'unknown place';
    if (typeof trace.stack === 'string') {
        const lines = trace.stack.split('\n')
        initiator = lines[lines?.findIndex(line => line.match(/^\s+at\s+(.*)/)) + 1]?.trim()?.substring(2);
    }
    return initiator
}

class Logger {
    constructor(){
        this.zipRecord();
        this.schedule = setInterval(() => {
            this.zipRecord();
        }, 1*24*60*60*1000);
    }

    LogDebug(...text) {
        if (argv.test || argv.t) {
            const output = `[${utility.getCurrentdate(true)}] Debug: ${util.format(...text)} => ${method}`
            const e  = {};
            Error.captureStackTrace(e)
            const method = extractCallMethod(e)
            console.log('\x1b[36m%s\x1b[0m', ...text, '=>', method)
            if (env.getEnvVar("LOG_PATH")) {
                if (!fs.existsSync(env.getEnvVar("LOG_PATH"))) {
                    fs.mkdir(env.getEnvVar("LOG_PATH"), (err)=>{
                        fs.appendFile(`${env.getEnvVar("LOG_PATH")}/${utility.getCurrentdate(false)}_debug.txt`, output + "\n", (err)=>{
                            if (err){
                                throw console.error('\x1b[41m%s\x1b[0m', `FataError: Logger ERROR: ${err}`)
                            }
                        });
                    })
                } else {
                    fs.appendFile(`${env.getEnvVar("LOG_PATH")}/${utility.getCurrentdate(false)}_debug.txt`, output + "\n", (err)=>{
                        if (err){
                            throw console.error('\x1b[41m%s\x1b[0m', `FataError: Logger ERROR: ${err}`)
                        }
                    });
                }
            }
        }
    }

    LogInfo(...text) {
        const e  = {};
        Error.captureStackTrace(e)
        const method = extractCallMethod(e)
        const output = `[${utility.getCurrentdate(true)}] Info: ${util.format(...text)} => ${method}`
        console.log(`[${utility.getCurrentdate(true)}] Info:`,  ...text, '=>', method)
        if (env.getEnvVar("LOG_PATH")) {
            if (!fs.existsSync(env.getEnvVar("LOG_PATH"))) {
                fs.mkdir(env.getEnvVar("LOG_PATH"), (err)=>{
                    fs.appendFile(`${env.getEnvVar("LOG_PATH")}/${utility.getCurrentdate(false)}_log.txt`, output + "\n", (err)=>{
                        if (err){
                            throw console.error('\x1b[41m%s\x1b[0m', `FataError: Logger ERROR: ${err}`)
                        }
                    });
                });
            } else {
                fs.appendFile(`${env.getEnvVar("LOG_PATH")}/${utility.getCurrentdate(false)}_log.txt`, output + "\n", (err)=>{
                    if (err){
                        throw console.error('\x1b[41m%s\x1b[0m', `FataError: Logger ERROR: ${err}`)
                    }
                });
            }
        }
    }

    LogError(...text) {
        const e  = {};
        Error.captureStackTrace(e)
        const method = extractCallMethod(e)
        const output =`[${utility.getCurrentdate(true)}] Error: ${util.format(...text)} => ${method}`
        console.error('\x1b[41m%s\x1b[0m', `[${utility.getCurrentdate(true)}] Error:`, ...text, '=>', method)
        if (env.getEnvVar("LOG_PATH")) {
            if (!fs.existsSync(env.getEnvVar("LOG_PATH"))) {
                fs.mkdir(env.getEnvVar("LOG_PATH"), (err)=>{
                    fs.appendFile(`${env.getEnvVar("LOG_PATH")}/${utility.getCurrentdate(false)}_error.txt`, output + "\n", (err)=>{
                        if (err){
                            throw console.error('\x1b[41m%s\x1b[0m', `FataError: Logger ERROR: ${err}`)
                        }
                    });
                });
            } else {
                fs.appendFile(`${env.getEnvVar("LOG_PATH")}/${utility.getCurrentdate(false)}_error.txt`, output + "\n", (err)=>{
                    if (err){
                        throw console.error('\x1b[41m%s\x1b[0m', `FataError: Logger ERROR: ${err}`)
                    }
                });
            }
        }
    }

    zipRecord() {
        const currentTime = new Date().getTime()
        const zipJob = []
        const output = fs.createWriteStream(`${env.getEnvVar("LOG_PATH")}/${utility.getdateFormat(currentTime-7*24*60*60*1000 ,false)}_old.zip`)
        const archive = archiver('zip', {gzip: true, zlib: {levle: 9}})

        archive.on('error', function(err) {
            throw err;
          });

        archive.pipe(output);
        fs.readdir(env.getEnvVar("LOG_PATH"), (err, files)=>{
            files.forEach(file =>{
                if (file.includes("_error") || file.includes("_log") || file.includes("_debug")) {
                    const target = file.split("_")[0]
                    const time = new Date(target).getTime()
                    if (currentTime - time >= 7*24*60*60*1000) {
                        zipJob.push({path: `${env.getEnvVar("LOG_PATH")}/${file}`})
                        archive.file(`${env.getEnvVar("LOG_PATH")}/${file}`, {name: file});
                    }
                }
            })
            archive.finalize()

            output.on('close', function() {
                zipJob.forEach(file => {
                    fs.rm(file.path, (err,cb)=>{})
                })
                if (zipJob.length == 0){
                    fs.rm(`${env.getEnvVar("LOG_PATH")}/${utility.getdateFormat(currentTime-7*24*60*60*1000 ,false)}_old.zip`, (err,cb)=>{})
                }
            });
        })
    }
}

module.exports = new Logger()