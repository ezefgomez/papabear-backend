const chai=require('chai')
const supertest=require('supertest')
const expect=chai.expect
const axios=require('axios')
const URL='http://localhost:8000'
const request=supertest(URL)




describe('Test Productos',()=>{
    let producto
    let id
    let productoNuevo
    beforeEach(()=>{
        producto={
            title: "Buzo hombre",
            price: 12500,
            image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/924/058/products/hq4018-13-21-9fc856bf55a47ee07116551486707870-1024-1024.jpeg",
            description: "Buzo oiginal, marca elemental, varios modelos y talles",
            stock: 23,
            categoria:"Ropa",
        }

        id='638a7ec6620fdd9603328e14'

        productoNuevo={
            title: "Buzo hombre",
            price: 12500,
            image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/924/058/products/hq4018-13-21-9fc856bf55a47ee07116551486707870-1024-1024.jpeg",
            description: "Buzo oiginal, marca elemental, varios modelos y talles",
            stock: 23,
            categoria:"Ropa",
        }
    })

    it('Traer todos los productos',async ()=>{
        const response=await axios.get(`${URL}/productos`)
        expect(response.status).to.eql(200)
        expect(response.data).to.be.an('array')
        expect(response.data).to.not.be.undefined
    
    }) 

/*      it('Subir un producto',async ()=>{
        const response=await request.post(`/productos`)
        .send(producto)
        expect(response.status).to.eql(201)
        expect(response.data).to.not.be.undefined
        }) 
*/

    it('Update Producto', async()=>{
        const response=await request.put(`/productos/${id}`,productoNuevo)
        expect(response.status).to.eql(200)
    })
})