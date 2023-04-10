const knex = require('../connections/knex')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
    const { username, senha } = req.body

    if (!username) {
        return res.status(400).json({ message: 'O campo username e obrigatório' });
    }
    if (!senha) {
        return res.status(400).json({ message: 'O campo senha e obrigatório' });
    }

    if (senha.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres' });
    }

    try {
        const usuarioExiste = await knex('usuarios').where({ username }).first();

        if (usuarioExiste) {
            return res.status(401).json({ message: 'Usuário indisponível' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoConta = await knex('usuarios')
            .insert({ username, senha: senhaCriptografada })

        return res.status(201).json({ messagem: 'Conta criada com sucesso!' });

    } catch (error) {
        return res.status(500).json({ "mensagem": error.message });
    }
};

module.exports = cadastrarUsuario