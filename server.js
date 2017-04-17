const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./resources/config');
const mongoDBConnection = require('./utils/db/mongoDBConnection');

const app = express();
mongoDBConnection();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

const auth = require('./app/controllers/authController')(app);
const todo = require('./app/controllers/todoController');
const article = require('./app/controllers/articlesController');

app.use(auth);
app.use(todo);
app.use(article);

app.listen(config.port, err => {
    if(err)
        console.log(err);
    console.log(`Listening port ${config.port}`);
});
