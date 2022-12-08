export default class Product {
    #title
    #price
    #thumbnail

    constructor({ title, price, thumbnail }) {
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }

    get title() { return this.#title }

    set title(title) {
        if (!title) throw new Error('"title" is a required field')
        this.#title = title
    }

    get price() { return this.#price }

    set price(price) {
        if (!price) throw new Error('"price" is a required field')
        this.#price = price
    }

    get thumbnail() { return this.#thumbnail }

    set thumbnail(thumbnail) {
        if (!thumbnail) throw new Error('"thumbnail" is a required field')
        this.#thumbnail = thumbnail
    }
}