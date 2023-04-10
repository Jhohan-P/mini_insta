const knex = require('../connections/knex');


const detalharPerfil = async (req, res) => {
    return res.status(200).json(req.usuario)
}

module.exports = detalharPerfil