const jwt = require('jsonwebtoken')
const knex = require('../connections/knex')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const { username, senha } = req.body

    try {
        const pegarConta = await knex('usuarios').where({ username });

        if (pegarConta.length == 0) {
            return res.status(404).json({
                "mensagem": "Usuário e/ou senha inválido(s)."
            });
        };

        const senhaRecebida = await bcrypt.compare(senha, pegarConta[0].senha);

        if (!senhaRecebida) {
            return res.status(200).json({
                "mensagem": "Usuário e/ou senha inválido(s)."
            });
        };

        const token = jwt.sign({ id: pegarConta[0].id }, process.env.SENHA_JWT, { expiresIn: '3h' });

        const { senha: senhaAtual, ...dadosUsuario } = pegarConta[0];

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });

    } catch (error) {
        return res.status(500).json({ "mensagem": error.message });
    }
};

module.exports = login