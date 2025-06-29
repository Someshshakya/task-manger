const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/users');
const validate = require('../middleware/requestValidator');
const { userRegisterSchema, loginSchema } = require('../validations/users');

router.post('/register', validate(userRegisterSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

module.exports = router;