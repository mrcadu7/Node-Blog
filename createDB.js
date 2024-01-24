const fs = require('fs');

const content = `
if(process.env.NODE_ENV == 'production') {
    module.exports = {
        connectionString: "STRING DE CONEXÃO AQUI"
    }
} else {
    module.exports = {
        connectionString: "localhost:3000"
    }
}
`;

fs.writeFile('db.js', content, err => {
    if (err) {
        console.error('Erro ao criar o arquivo db.js:', err);
    } else {
        console.log('Arquivo db.js criado com sucesso.');
    }
});