const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Postagem = new schema({
    titulo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    categoria: {
        type: schema.Types.ObjectId,
        ref: "categorias",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('postagens', Postagem)

