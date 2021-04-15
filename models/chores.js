// ALL chores
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM chores', (err, rows) => {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};


// ALL tareas de un usuario
const getChoresByUserId = (pId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT chores.* FROM chores, user WHERE user.id = chore.fk_user AND user.id = ?',
            [pId],
            (err, rows) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

// NEW CHORE
const create = ({
    title,
    detail,
    fk_user,
}) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO chores (title,detail,fk_user) VALUES (?, ?, ?)',
            [
                title,
                detail,
                fk_user
            ],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// UPDATE CHORE
const updateByIdToken = ({
    id,
    title,
    detail,
}) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE chores set title = ?, detail = ?, WHERE id = ?',
            [
                title,
                detail,
                id,
            ],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// DELETE CHORE
const deleteByIdToken = ({ id, fk_user }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE from chores WHERE id = ? AND fk_user = ?',
            [id, fk_user],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

module.exports = {

    getAll,
    getChoresByUserId,
    create,
    updateByIdToken,
    deleteByIdToken,
}