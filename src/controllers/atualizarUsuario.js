const knex = require('../connections/knex')
const bcrypt = require('bcrypt')

const atualizarUsuario = async (req, res) => {
    const {
        nome,
        email,
        senha,
        imagem,
        username,
        site,
        bio,
        telefone,
        genero
    } = req.body
    let usuario = req.usuario

    if (!nome && !imagem && !username && !email && !site && !bio && !telefone && !genero && !senha) {
        return res.status(400).json({ message: 'É obrigatório informar ao menos um campo para atualização' });
    }

    try {

        if (senha) {
            if (senha.length < 6) {
                return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres' });
            }
            senha = await bcrypt.hash(senha, 10);
        }
        if (email) {
            if (email !== usuario.email) {
                const emailExistente = await knex('usuarios').where({ email }).first();

                if (emailExistente) {
                    return res.status(404).json({ message: 'Email ja existe.' });
                }
            }
        }


        if (username !== usuario.username) {
            const usernameExistente = await knex('usuarios').where({ username }).first();

            if (usernameExistente) {
                return res.status(404).json({ message: 'O Username ja existe' });
            }
        }



        const updateDeDados = await knex('usuarios')
            .update({
                nome,
                email,
                senha,
                imagem,
                username,
                site,
                bio,
                telefone,
                genero
            })
            .where({ id: usuario.id });

        if (!updateDeDados) {
            return res.status(400).json({ message: 'Não foi possível atualizar o perfil' });
        }

        return res.status(200).json({ messagem: "Usuario atualizado com sucesso" });

    } catch (error) {
        return res.status(500).json({ messagem: error.message });
    };
};


module.exports = atualizarUsuario