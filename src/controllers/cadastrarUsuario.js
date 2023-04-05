const knex = require('../connections/knex')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
    const { username, senha } = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoConta = await knex('usuarios')
            .insert({ username, senha: senhaCriptografada })

        return res.status(201).json({ messagem: 'Conta criada com sucesso!' });

    } catch (error) {
        return res.status(500).json({ "mensagem": error.message });
    }
};

module.exports = cadastrarUsuario