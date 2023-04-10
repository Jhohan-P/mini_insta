const knex = require('../connections/knex');

const feed = async (req, res) => {
    const { id } = req.usuario
    const { offset } = req.query

    const paginacao = offset ? offset : 0;
    try {
        const postagens = await knex('postagens')
            .where('usuario_id', '!=', id)
            .limit(10)
            .offset(paginacao)
            .orderBy('data', 'desc');

        if (postagens.length === 0) {
            return res.status(200).json(postagens)
        }

        for (const postagem of postagens) {
            const usuario = await knex('usuarios')
                .where({ id: postagem.usuario_id })
                .select('imagem', 'username', 'vereficado')
                .first();
            postagem.usuario = usuario

            const fotos = await knex('postagem_fotos')
                .where({ postagem_id: postagem.id })
                .select('imagem');
            postagem.fotos = fotos;

            const curtidas = await knex('postagem_curtidas')
                .where({ postagem_id: postagem.id })
                .select('usuario_id');
            postagem.curtidas = curtidas.length;

            postagem.curtidoPorMin = curtidas.find(curtida => curtida.usuario_id === id) ? true : false;

            const comentarios = await knex('postagem_comentarios')
                .leftJoin('usuarios', 'usuarios.id', 'postagem_comentarios.usuario_id')
                .where({ postagem_id: postagem.id })
                .select('usuarios.username', 'postagem_comentarios.texto');
            postagem.comentarios = comentarios;
        }
        return res.status(200).json(postagens)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }

}

module.exports = feed