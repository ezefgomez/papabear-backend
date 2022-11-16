import { Router } from "express";
import { faker } from '@faker-js/faker'

const generateMockProducts = (cant) => {
    const fakeProducts = []
    for(let i=0; i<cant; i++){
        fakeProducts.push({
            id: i,
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            foto: faker.image.image()
        })
    }
    return fakeProducts
}

const router = Router()

router.get('/productos-test', async (req, res) => {
    const prods = generateMockProducts(5)
    res.json(prods)
})

export default router