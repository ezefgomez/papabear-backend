export default class Message {
    #author
    #avatar
    #text
    #timestamp

    constructor({ author, avatar, text, timestamp }) {
        this.author = author
        this.avatar = avatar
        this.text = text
        this.timestamp = timestamp
    }

    get author() { return this.#author }

    set author(author) {
        if (!author) throw new Error('"author" is a required field')
        this.#author = author
    }

    get avatar() { return this.#avatar }

    set avatar(avatar) {
        if (!avatar) throw new Error('"avatar" is a required field')
        this.#avatar = avatar
    }

    get text() { return this.#text }

    set text(text) {
        if (!text) throw new Error('"text" is a required field')
        this.#text = text
    }

    get timestamp() { return this.#timestamp }

    set timestamp(timestamp) {
        if (!timestamp) throw new Error('"timestamp" is a required field')
        this.#timestamp = timestamp
    }
}