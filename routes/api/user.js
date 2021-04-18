const {
    getAll,
    create,
    updateById,
    deleteById,
    getById,
    getByEmail,
} = require('../../models/user');

const { getChoresByUserId } = require('../../models/chores');


// PASSWORD AND TOKEN
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const { checkToken } = require('../../middlewares');

/* TOKEN Y MIDDLEWARE */

// Body -> email, password
router.post('/login', async (req, res) => {
    const user = await getByEmail(req.body.email);
    console.log(user);
    if (user) {
        const equal = bcrypt.compareSync(req.body.password, user.password);
        if (equal) {
            res.json({
                success: 'Welcome back!!',
                token: createToken(user),
            });
        } else {
            res.json({ error: 'Wrong email or password' });
        }
    } else {
        res.json({ error: 'Wrong email or password' });
    }
});

function createToken(pUser) {
    const data = {
        userId: pUser.id,
        caduca: dayjs().add(10, 'hours').unix(),
    };

    return jwt.sign(data, 'to-do-list');
}
/* END TOKEN Y MIDDLEWARE */

// GET ALL USER
router.get('/', async (req, res) => {

    try {
        const user = await getAll();
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// GET BY ID USER
router.get('/profile', checkToken, async (req, res) => {
    try {
        const user = await getById(req.userId);
        const chore = await getChoresByUserId(req.userId);
        user.chores = chore;
        res.json(user);

    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
});

// CREATE USER
router.post('/', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const result = await create(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// Delete user
router.delete('/', checkToken, async (req, res) => {
    try {
        req.body.id = req.userId;
        const user = await deleteById(req.body.id);
        console.log('log de user', user);
        console.log('log de req.body.id', req.body.id);
        res.json(user);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// Update user
router.put('/', checkToken, async (req, res) => {
    try {
        req.body.id = req.userId;
        const result = await updateById(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});


module.exports = router;
