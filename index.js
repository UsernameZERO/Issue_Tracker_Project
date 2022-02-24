const express = require('express');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const app = express();

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,// it is false in production mode
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.static('./assets'))
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/',require('./routes'));


// app.listen(port, (err)=>{
//     if(err) console.log(`error in the port server ${err}`);
//     console.log(`Server Running on PORT : ${port}`);
// });
//
app.listen( process.env.PORT || 0897, function(){
     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    
  });


