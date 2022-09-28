class WelcomeController {
    static async sayHello(req, res) {
        return res.status(200).json({ message: 'Seja Bem Vindo' });
    }
}

module.exports = WelcomeController;