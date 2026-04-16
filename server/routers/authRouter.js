import { Router } from 'express'
const router = Router();

import db from '../database/connection.js'

import { compareHashedPassords } from '../utils/passwordHashing.js';

router.post('/login', async (req, res) => {

    console.log(req.session.user)

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            data: {
                errorMessage: "Please fill out Username & Password"
            }
        });
    }

    const foundUserFromDatabase = (
        await db.all('SELECT * FROM users WHERE username = ?', [username]))[0]

    if (!foundUserFromDatabase) {
        return res.status(401).send({
            data: {
                errorMessage: "Wrong login information"
            }
        });
    }

    const passwordIsEqual = await compareHashedPassords(password, foundUserFromDatabase.password);

    if (!passwordIsEqual) {
        return res.status(401).send({
            data: {
                errorMessage: "Wrong login information"
            }
        });
    }
    const { password: _, ...safeUser } = foundUserFromDatabase;
    req.session.user = safeUser;

    res.status(200).send({ data: "Loggin succesful" })
});


router.post('/register', (req, res) => {


});


export default router;