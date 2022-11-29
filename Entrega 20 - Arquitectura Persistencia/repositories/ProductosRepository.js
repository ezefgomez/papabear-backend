import Productos from '../models/Producto'
import ProductosDaoFactory from '../daos/productos/productosDaoFactory'
import { asDto } from '../dtos/ProductDTO.js'

export default class ProductosRepository {
    #dao

    constructor() {
        this.#dao = ProductosDaoFactory.getDao()
    }

    async getAll() {
        const products = await this.#dao.getAll()
        return products
    }

    async getById(id) {
        const dto = await this.#dao.getById(id)
        return new Productos(dto)
    }

    async add(doc) {
        await this.#dao.save(asDto(doc))
    }

    async removeById(id) {
        const removida = await this.#dao.deleteById(id)
        return new Productos(removida)
    }

    async removeAll() {
        await this.#dao.deleteAll()
    }
}