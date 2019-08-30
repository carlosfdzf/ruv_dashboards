//librerias
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');

//inicializaciones
const app = express();
require('./lib/passport');

//configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');



//middlewares
app.use(session({
    secret: 'sesionsecreta',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    
    if (req.user) {
        if (req.user.type == 'admin') {
            app.locals.admin = true;
        } else {
            app.locals.admin = false;
        }
    }
    app.locals.user = req.user;
    next();
});

//rutas
app.use(require('./routes/index.js'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));


//carpeta publica
app.use(express.static(path.join(__dirname, 'public')));

//inicializacion del servidor
app.listen(app.get('port'), () => {
    console.log('servidor incializado en el puerto: ', app.get('port'));
});