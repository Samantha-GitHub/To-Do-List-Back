const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const checkToken = (req, res, next) => {
    // 1 - Checking if token is in headers
    if (!req.headers['authorization']) {
        return res.json({ error: 'You must includes the headers Authorization' });
    }

    // 2 - Checking if token is valid
    const token = req.headers['authorization'];
    let data;
    try {
        data = jwt.verify(token, 'to-do-list');
    } catch (error) {
        return res.json({ error: "The token isn't correct" });
    }

    // 3 - Checking if token has expired
    if (dayjs().unix() > data.caduca) {
        return res.json({ error: 'The token expired' });
    }

    req.userId = data.userId;

    next();
};

module.exports = {
    checkToken,
};
