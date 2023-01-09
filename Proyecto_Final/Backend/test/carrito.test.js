const chai=require('chai')
const supertest=require('supertest')
const expect=chai.expect
const axios=require('axios')
const URL='http://localhost:8000'
const request=supertest(URL)




describe('Test Carrito',()=>{
    it('Traer todos los carritos',async ()=>{
        const response=await axios.get(`${URL}/carrito`)
        expect(response.status).to.eql(200)
        expect(response.data).to.be.an('array')
    }) 
})