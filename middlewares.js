const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const checkToken = (req, res, next) => {
    // 1 - Comprobar si el token está en las cabeceras
    if (!req.headers['authorization']) {
        return res.json({ error: 'You must includes the headers Authorization' });
    }

    // 2 - Comprobar si el token es válido
    const token = req.headers['authorization'];
    let data;
    try {
        data = jwt.verify(token, 'to-do-list');
    } catch (error) {
        return res.json({ error: "The token isn't correct" });
    }

    // 3 - Comprobar si el token está caducado
    if (dayjs().unix() > data.caduca) {
        return res.json({ error: 'The token expired' });
    }

    // Incluir en la petición el ID del USUARIO que está realizando dicha petición
    req.empresaId = data.companyId;
    req.userId = data.userId;

    next();
};

module.exports = {
    checkToken,
};
