// Módulos
    const express = require('express');
    const handlebars = require('express-handlebars').create({
        defaultLayout: 'main', runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        } 
    });
    const bodyParser = require('body-parser');
    const app = express();
    const admin = require('./routes/admin');
    const path = require('path');
    const mongoose = require('mongoose');
    const session = require('express-session');
    const flash = require('connect-flash');
    


// Configurações
    // Session
        app.use(session({
            secret: 'nodeblog',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash());

    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            next();
        })

    // Body Parser
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

    // Handlebars
        app.engine('handlebars', handlebars.engine);
        app.set('view engine', 'handlebars');

    // Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/nodeblog').then(() => {
            console.log('Conectado ao MongoDB');
        }).catch((err) => {
            console.log('Erro ao conectar ao MongoDB' + err);
        });
        
    
    // Public
        app.use(express.static(path.join(__dirname, 'public')))

        app.use((req, res, next) => {
            console.log('ola sou o middleware...');
            next();
        })

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