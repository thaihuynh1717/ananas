class AuthController {
    // [POST] /api/auth/register
    async register(req, res) {
        let { email, password } = req.body;
        res.send({
            email,
            password,
        });
    }
}

module.exports = new AuthController();
