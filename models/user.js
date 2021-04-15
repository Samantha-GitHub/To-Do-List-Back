// ALL USERS
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user', (err, rows) => {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// GET USER BY ID
const getById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM user WHERE user.id = ?',
            [pId],
            (err, rows) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(rows[0]);
                }
            }
        );
    });
};

// NEW FREELANCE
const create = ({
    firstname,
    lastname,
    email,
    password,
}) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO user (firstname,lastname,email, password) VALUES (?, ?, ?, ?)',
            [
                firstname,
                lastname,
                email,
                password,
            ],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// get by email
const getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        //db.query('QUERY', [], (err, result) => { });

        db.query('select * from user WHERE email = ?', [email], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });
    });
};

// UPDATE FREELANCER
const updateById = ({
    id,
    firstname,
    lastname,
    email,
    password,
}) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE user set firstname = ?, lastname = ?, email = ?, password = ? WHERE id = ?',
            [
                firstname,
                lastname,
                email,
                password,
                id,
            ],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// DELETE FREELANCER
const deleteById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE from user WHERE id = ?', [pId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    getAll,
    create,
    updateById,
    deleteById,
    getById,
    getByEmail,

};