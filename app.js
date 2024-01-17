// Módulos
    const express = require('express');
    const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
    const bodyParser = require('body-parser');
    const app = express();
    const admin = require('./routes/admin');
    const path = require('path');
    // const mongoose = require('mongoose');


// Configurações

    // Body Parser
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

    // Handlebars
        app.engine('handlebars', handlebars.engine);
        app.set('view engine', 'handlebars');

    // Mongoose
        // mongoose.connect('mongodb://localhost/blog');
    
    // Public
        app.use(express.static(path.join(__dirname, 'public')))


// Rotas
    app.get('/', (req, res) => {
        res.send('home');
    })

    app.get('/posts', (req, res) => {
        res.send('posts');
    })

    app.use('/admin', admin);

// Outros
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando no link http://localhost:${PORT}`);
    })