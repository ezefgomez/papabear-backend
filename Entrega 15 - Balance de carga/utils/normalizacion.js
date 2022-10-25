import normalizr from 'normalizr'

const normalize = normalizr.normalize
const schema = normalizr.schema

const authorSchema = new schema.Entity('authors')

const postSchema = new schema.Entity('post', {
    author: authorSchema
})

const postsSchema = new schema.Entity('posts', { mensajes: [postSchema], authors: [authorSchema] })


const normalizar = (msgData) => {
    const data = { id: 'mensajes', mensajes: msgData}
    return normalize(data, postsSchema)
}

export default normalizar