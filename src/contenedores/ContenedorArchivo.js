import { promises as fs } from 'fs'

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta
    }

    async listar(id) {
        const objs = await this.listarAll()
        const buscado = objs.find(o => o.id == id)
        return buscado
    }

    async listarAll() {
        try {
            const objs = await fs.readFile(this.ruta)
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }
}