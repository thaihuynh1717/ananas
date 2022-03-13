const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // token exist
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    // invalid token - synchronous
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
};
