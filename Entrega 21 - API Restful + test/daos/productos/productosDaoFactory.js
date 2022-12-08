import ProductosDaoMongodb from './productosDaoMongoDB'
import ProductosDaoFirebase from './productosDaoFirebase'
import ProductosDaoArchivo from './productosDaoArchivo'
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).argv;
const option = argv.persistence || 'mongo';

let dao
switch (option) {
    case 'mongo':
        dao = new ProductosDaoMongodb()
        break
    case 'firebase':
        dao = new ProductosDaoFirebase()
        break
    case 'archivo':
        dao = new ProductosDaoArchivo()
        break
    default:
        dao = new ProductosDaoMongodb()
}

export default class PersonasDaoFactory {
    static getDao() {
        return dao
    }
}