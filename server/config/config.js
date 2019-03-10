// Puerto: 
process.env.PORT = process.env.PORT || 3000;

//entorno 
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// database 
let urlDatabase;

if (process.env.NODE_ENV === 'dev') {
    urlDatabase = 'mongodb://localhost:27017/cafe'
} else {
    urlDatabase = '';
}

process.env.URL_DB = urlDatabase;