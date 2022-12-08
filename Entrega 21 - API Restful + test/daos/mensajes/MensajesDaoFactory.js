import MensajesDaoMongoDb from './MensajesDaoMongoDB'
import MensajesDaoFirebase from './MensajesDaoFirebase'
import MensajesDaoArchivo from './MensajesDaoArchivo'
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).argv;
const option = argv.persistence || 'mongo';

let dao
switch (option) {
    case 'mongo':
        dao = new MensajesDaoMongoDb()
        break
    case 'firebase':
        dao = new MensajesDaoFirebase()
        break
    case 'firebase':
        dao = new MensajesDaoArchivo()
        break
    default:
        dao = new MensajesDaoMongoDb()
}

export default class MensajesDaoFactory {
    static getDao() {
        return dao
    }
}