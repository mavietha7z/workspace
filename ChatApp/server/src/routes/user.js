const express = require('express');
const { registerUser, loginUser, findUser, getUser } = require('../controllers/user');

const router = express.Router();

router.get('/', getUser);
router.post('/login', loginUser);
router.get('/find/:userId', findUser);
router.post('/register', registerUser);

module.exports = router;
