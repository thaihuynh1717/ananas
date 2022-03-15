/**
 * required modules
 */
require('dotenv').config();
/**
 * variables
 */
const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const morgan = require('morgan');
const route = require('./routes');
const db = require('./models');
/**
 * app configure
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('combined'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'resources/images')));
/**
 * app routing
 */
route(app);
/**
 * app listens to requests
 */
app.listen(port, async () => {
    // await db.init()
    console.log(`App is listening on port ${port}`);
});
