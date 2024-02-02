const express = require('express');
const sso = require('../modules/sso');
const authenticateToken = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', sso.ssoRegister);
router.post('/login', sso.ssoLogin);
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

module.exports = router;
