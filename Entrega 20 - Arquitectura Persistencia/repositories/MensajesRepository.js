import Mensaje from '../models/Mensaje'
import MensajesDaoFactory from '../daos/mensajes/MensajesDaoFactory'
import { asDto } from '../dtos/MensajesDto'

export default class MensajesRepository {
    #dao

    constructor() {
        this.#dao = MensajesDaoFactory.getDao()
    }

    async getAll() {
        return await this.#dao.getAll()
    }

    async getById(id) {
        const dto = await this.#dao.getById(id)
        return new Mensaje(dto)
    }

    async add(doc) {
        await this.#dao.save(asDto(doc))
    }

    async removeById(id) {
        const removida = await this.#dao.deleteById(id)
        return new Mensaje(removida)
    }

    async removeAll() {
        await this.#dao.deleteAll()
    }
}