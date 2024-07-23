const express = require('express');
const mysql2 = require('../database/connect').pool;
const router = express.Router();
const jwt = require('jsonwebtoken');
// Post
router.post('/login', (req, res, next) => {
  const { email, senha } = req.body;
  mysql2.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      'SELECT * FROM Login WHERE email = ? AND senha = ?',
      [email, senha],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length === 0) {
          return res.status(401).send({ message: 'Authentication failed' });
        }
        const token = jwt.sign(
          {
            id: result[0].login_id,
            email: result[0].email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1h',
          }
        );
        return res.status(200).send({ Login: true, token, result });
      }
    );
  });
});

// Get
const verifyJwt = (req, res, next) => {
  const token = req.headers['access-token'];
  if (!token) {
    return res
      .status(401)
      .send({ auth: 'Unauthorized', message: 'No token provided' });
  }
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
};

router.get('/checkAuth', verifyJwt, (req, res, next) => {
  return res
    .status(200)
    .send({ auth: 'Authorized', message: 'Authentication success' });
});





module.exports = router;
