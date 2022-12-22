import faker from 'faker'
faker.setLocale('es_MX');

const randomNumber = (limit) => {
    return faker.datatype.number(limit);
}

const newProduct = () => {
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.image()
    }
}

const newProductArray = (count) => {
    var arr = []

    for (let index = 0; index < count; index++) {
        arr.push(newProduct())
    }
    return arr
}

export { newProduct, newProductArray, randomNumber }