import { newProduct, randomNumber } from "./fakerUtils.js";
import supertest from "supertest";
import chai from "chai";
const request = supertest('http://localhost:8080')
const expect = chai.expect

describe("Tests de API Restful", () => {
    const product = newProduct();
    let id;
    it("POST /api/productos debería agregar un producto.", async () => {
        let response = await request.post('/api/productos').send(product)
        expect(response.status).to.eql(200)
        expect(response.body.id).to.not.be.null
        id = response.body.id
    })

    it(`GET /api/productos debería traer algún producto.`, async () => {
        let response = await request.get(`/api/productos`)
        expect(response.status).to.eql(200)
        expect(response.body.length).to.not.eql(0)
    })

    const newProd = newProduct()
    it(`PUT /api/productos/:id debería modificar el producto ${product.title} a ${newProd.title}.`, async () => {
        let response = await request.put(`/api/productos/${id}`).send(newProd)
        expect(response.status).to.eql(204)
    })

    it(`GET /api/productos/:id debería traer el producto modificado ${newProd.title}.`, async () => {
        let response = await request.get(`/api/productos/${id}`)
        expect(response.status).to.eql(200)
        expect(response.body.title).to.eql(newProd.title)
        expect(response.body.price).to.eql(newProd.price)
        expect(response.body.thumbnail).to.eql(newProd.thumbnail)
    })

    it(`DELETE /api/productos/:id debería eliminar el producto ${newProd.title}.`, async () => {
        let response = await request.delete(`/api/productos/${id}`)
        expect(response.status).to.eql(204)
    })

    it(`GET /api/productos/:id pasando el id del producto ${newProd.title} debería dar error.`, async () => {
        let response = await request.get(`/api/productos/${id}`)
        expect(response.status).to.eql(404)
    })

    const count = randomNumber(10);
    it(`Ejecutar POST /api/productos ${count} debería crear ${count} productos.`, async () => {
        let response;
        for (let index = 0; index < count; index++) {
            response = await request.post('/api/productos').send(newProduct())
            expect(response.status).to.eql(200)
        }
    })

    it(`GET /api/productos debería recuperar ${count} productos.`, async () => {
        let response = await request.get('/api/productos')
        expect(response.status).to.eql(200)
        expect(response.body.length).to.eql(count)
    })

    it("DELETE /api/productos debería borrar todos los productos.", async () => {
        let response = await request.delete('/api/productos')
        expect(response.status).to.eql(200)
    })

    it("GET /api/productos debería recuperar 0 productos.", async () => {
        let response = await request.get('/api/productos')
        expect(response.status).to.eql(200)
        expect(response.body.length).to.eql(0)
    })
})