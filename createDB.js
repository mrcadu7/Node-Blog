const fs = require('fs');
const path = 'config/db.js';

if (fs.existsSync(path)) {
    console.log('O arquivo db.js já existe.');
    process.exit();
}

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

fs.writeFile(path, content, err => {
    if (err) {
        console.error('Erro ao criar o arquivo db.js:', err);
    } else {
        console.log('Arquivo db.js criado com sucesso.');
    }
});
