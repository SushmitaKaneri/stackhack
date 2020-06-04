const logger           = require('morgan'),
      busboyBodyParser = require('busboy-body-parser');
      bodyparser = require('body-parser');
      cors = require('cors');
      session = require('express-session');
      passport = require('passport');
      express = require('express');
      cookieparser = require('cookie-parser')
module.exports = (app) => {

    
    app.use('/', express.static(__dirname + '/../client'));
    app.use(cors({credentials:true, origin:"http://localhost:3000"}));
    app.use(logger('dev'));
    app.use(busboyBodyParser({ multi : true }));  
    //app.use(bodyparser());
    app.use(bodyparser.urlencoded({ extended: true }));

   
    app.use(express.json());
    app.use(cookieparser("password"));
    app.use(session({
        secret : "password",
        resave : false,
        saveUninitialized : true    ,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge:  1800000
        },
        name : "id"
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    require('./passport')(passport);
};