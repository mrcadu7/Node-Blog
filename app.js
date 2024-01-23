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
    require('./models/Postagem');
    const Postagem = mongoose.model('postagens');
    require('./models/Categoria');
    const Categoria = mongoose.model('categorias');
    const usuarios = require('./routes/usuario');
    const passport = require('passport');
    require('./config/auth')(passport);
    const db = require('./config/db');
    


// Configurações
    // Session
        app.use(session({
            secret: 'nodeblog',
            resave: true,
            saveUninitialized: true
        }))

        app.use(passport.initialize());
        app.use(passport.session());

        app.use(flash());

    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            res.locals.error = req.flash('error');
            res.locals.user = req.user || null;
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
        mongoose.connect(db.connectionString).then(() => {
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
        Postagem.find().populate('categoria').sort({data: 'desc'}).then((postagens) => {
            res.render('index', {postagens: postagens});
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno');
            res.redirect('/');
        })
    })

    app.get('/postagem/:slug', (req, res) => {
        Postagem.findOne({slug: req.params.slug}).then((postagem) => {
            if (postagem) {
                res.render('postagem/index', {postagem: postagem});
            } else {
                req.flash('error_msg', 'Esta postagem não existe');
                res.redirect('/');
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno');
            res.redirect('/');
        })
    })

    app.get('/categorias', (req, res) => {
        Categoria.find().then((categorias) => {
            res.render('categorias/index', {categorias: categorias});
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno');
            res.redirect('/');
        })
    })

    app.get('/categorias/:slug', (req, res) => {
        Categoria.findOne({slug: req.params.slug}).then((categoria) => {
            if (categoria) {
                Postagem.find({categoria: categoria._id}).then((postagens) => {
                    res.render('categorias/postagens', {postagens: postagens, categoria: categoria});
                }).catch((err) => {
                    req.flash('error_msg', 'Houve um erro ao listar os posts');
                    res.redirect('/');
                })
            } else {
                req.flash('error_msg', 'Esta categoria não existe');
                res.redirect('/');
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno');
            res.redirect('/');
        })
    })

    app.get("/404", (req, res) => {
        res.send('Página não encontrada');
    })

    app.get('/posts', (req, res) => {
        res.send('posts');
    })

    app.use('/admin', admin);
    app.use('/usuarios', usuarios)

// Outros
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando no link http://localhost:${PORT}`);
    })