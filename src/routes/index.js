const pageRoute = require('./pageRoute');
const productRoute = require('./productRoute');
const authRoute = require('./authRoute');

function route(app) {
    //app.use('/api/auth', authRoute);
    app.use('/api/products', productRoute);
    // app.use('/', pageRouter);
}

module.exports = route;
