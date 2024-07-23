const express = require('express');
const mysql2 = require('../database/connect').pool;
const router = express.Router();

// GetAll
router.get('/user', (req, res, next) => {
  mysql2.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query('SELECT * FROM Login', (error, result, field) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error });
      }
      return res.status(200).send({
        response: result,
      });
    });
  });
});

// GetById
router.get('/user/:id', (req, res, next) => {
  mysql2.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      'SELECT * FROM Login where login_id = ?;',
      [req.params.id],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({
          response: result,
        });
      }
    );
  });
});

// GetScore
router.get('/userScore', (req, res, next) => {
  mysql2.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `select l.nome, count(m.motorista_id) as "cadastros" from Motorista m join Login l on l.login_id = m.usuario_id group by m.usuario_id;`,
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({
          response: result,
        });
      }
    );
  });
});

module.exports = router;
