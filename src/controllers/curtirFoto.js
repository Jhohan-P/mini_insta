const knex = require('../connections/knex');

const curtir = async (req, res) => {
    const { id } = req.usuario
    const { postagemId } = req.params;
    try {
        const postagem = await knex('postagens').where({ id: postagemId }).first();

        if (!postagem) {
            return res.status(404).json({ messagem: "Postagem nao encontrada" })
        }
        const jaCurtiu = await knex('postagem_curtidas')
            .where({ usuario_id: id, postagem_id: postagem.id })
            .first();

        if (jaCurtiu) {
            return res.status(404).json({ messagem: "O usuario ja curtiu essa postagem" })
        }
        const curtida = await knex('postagem_curtidas')
            .insert({
                usuario_id: id,
                postagem_id: postagem.id
            })
        if (!curtida) {
            return res.status(400).json({ messagem: "Nao foi possivel curtir essa postagem" })
        }
        return res.status(200).json({ messagem: "Postagem curtida com sucesso" })
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}
module.exports = curtir