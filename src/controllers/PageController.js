class PageController {
    // [GET] /
    index(req, res) {
        res.send('index page');
    }
}

module.exports = new PageController();
