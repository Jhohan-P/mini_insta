const knex = require('../connections/knex');

const registrarComentario = async (req, res) => {
    const { id } = req.usuario
    const { postagemId } = req.params;
    const { texto } = req.body

    if (!texto) {
        return res.status(404).json({ messagem: "Para comentar nessa postagem e necessario informar o texto." })
    }
    try {
        const postagem = await knex('postagens').where({ id: postagemId }).first();

        if (!postagem) {
            return res.status(404).json({ messagem: "Postagem nao encontrada" })
        }

        const comentario = await knex('postagem_comentarios')
            .insert({
                usuario_id: id,
                postagem_id: postagem.id,
                texto
            })

        if (!comentario) {
            return res.status(400).json({ messagem: "Nao foi possivel comentar nessa postagem" })
        }
        return res.status(200).json({ messagem: "Postagem comentada com sucesso" })
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}
module.exports = registrarComentario