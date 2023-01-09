const parseArgs=require('minimist')
const puertoMinimist={
    alias:{
        p:'puerto'
    },
    default:{
        puerto:8080
    }
}

const puertoDefault=parseArgs(process.argv.slice(2),puertoMinimist)
puertoDefault.otros=puertoDefault._
delete puertoDefault._
delete puertoDefault.otros
module.exports=puertoDefault