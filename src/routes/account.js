const express = require('express');
const mysql2 = require('../database/connect').pool;
const router = express.Router();

router.post('/account', (req, res, next) => {
  try {
    mysql2.getConnection((err, conn) => {
      const { banco, agencia, conta, nome, cpf, pix } = req.body;
      conn.query(
        `INSERT INTO Conta(banco,agencia,conta,nome,cpf,pix) VALUES ('${banco}', '${agencia}', '${conta}', '${nome}', '${cpf}', '${pix}')`,
        (err, result) => {
          if (err) {
            console.log('Error creating the driver:', err);
            return res.status(500).send('Error creating the driver');
          }
          return res.status(201).send('Account created successfully');
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/account', (req, res) => {
  try {
    mysql2.getConnection((err, conn) => {
      conn.query('SELECT * FROM Conta', (err, result) => {
        if (err) {
          console.log('Error getting the drivers:', err);
          return res.status(500).send('Error getting the drivers');
        }
        return res.status(200).json(result);
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/account/:id', (req, res) => {
  try {
    mysql2.getConnection((err, conn) => {
      const { id } = req.params;
      conn.query(`SELECT * FROM Conta WHERE conta_id =${id}`, (err, result) => {
        if (err) {
          console.log('Error getting the driver:', err);
          return res.status(500).send('Error getting the driver');
        }
        return res.status(200).json(result);
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
