const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const morgan = require('morgan');
const route = require('./routes');
const db = require('./models');
const bodyParser= require('body-parser')


// parsing the incoming data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// route init
route(app);

//serving static file
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'resources/images')));

// dev packages
app.use(morgan('combined'));

// app listens to requests
app.listen(port, async () => {
    // wait database sync
    await db.sync();
    console.log(`App is listening on port ${port}`);
});
