const {
    getAll,
    getChoresByUserId,
    create,
    updateByIdToken,
    deleteByIdToken,

} = require('../../models/chores');

const router = require('express').Router();
const { checkToken } = require('../../middlewares');

//ALL the chores

router.get('/', async (req, res) => {

    try {
        const chores = await getAll();
        res.json(chores);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// ALL the chores of a user (and we got a JSON)
router.get('/:pId', async (req, res) => {
    // Id of user -> Middleware checkToken!

    try {
        const chores = await getChoresByUserId(req.params.pId);
        res.json(chores);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Create new chore

router.post('/', checkToken, async (req, res) => {
    try {
        req.body.fk_user = req.userId;
        const result = await create(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// Delete a Chore
router.delete('/:idChore', checkToken, async (req, res) => {
    try {
        const json = {
            id: req.params.idChore,
            fk_usuario: req.userId,
        };
        console.log(json);
        const result = await deleteByIdToken(json);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// Actualizo un Chore
router.put('/', async (req, res) => {
    try {
        const result = await updateByIdToken(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});


module.exports = router;