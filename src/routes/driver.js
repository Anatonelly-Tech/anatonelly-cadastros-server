const express = require('express');
const mysql2 = require('../database/connect').pool;
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'endereco') {
      cb(null, './uploads/endereco/');
    }
    if (file.fieldname === 'antt') {
      cb(null, './uploads/antt/');
    }
    if (file.fieldname === 'crlv') {
      cb(null, './uploads/crlv/');
    }
    if (file.fieldname === 'cnh') {
      cb(null, './uploads/cnh/');
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      +'-' +
        file.fieldname +
        (file.mimetype === 'image/jpeg'
          ? '.jpg'
          : file.mimetype === 'image/png'
          ? '.png'
          : '.pdf')
    );
  },
});
const upload = multer({ storage: storage });

// Post
router.post(
  '/driver',
  upload.fields([
    { name: 'endereco', maxCount: 1 },
    { name: 'antt', maxCount: 1 },
    { name: 'crlv', maxCount: 1 },
    { name: 'cnh', maxCount: 1 },
  ]),

  (req, res, next) => {
    const {
      nome,
      telefone,
      cpf,
      caminhao,
      carroceria,
      banco,
      agencia,
      conta,
      pix,
    } = req.body;
    const endereco = req.files.endereco[0].path;
    const antt = req.files.antt[0].path;
    const crlv = req.files.crlv[0].path;
    const cnh = req.files.cnh[0].path;
    mysql2.getConnection((err, conn) => {
      if (err) {
        returnres.status(500).send({ error: err });
      }
      conn.query(
        `INSERT INTO Motorista(nome,telefone,cpf,endereco,antt,crlv,cnh,caminhao,carroceria,banco, agencia, conta, pix) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`,
        [
          nome,
          telefone,
          cpf,
          endereco,
          antt,
          crlv,
          cnh,
          caminhao,
          carroceria,
          banco,
          agencia,
          conta,
          pix,
        ],
        (error, result, field) => {
          conn.release();
          if (error) {
            return res.status(500).send({
              error: error,
              response: null,
            });
          }
          return res.status(201).send({
            mensagem: 'Motorista inserido com sucesso',
            motorista_id: result.insertId,
          });
        }
      );
    });
  }
);

// GetAll
router.get('/driver', (req, res, next) => {
  mysql2.getConnection((err, conn) => {
    if (err) {
      returnres.status(500).send({ error: err });
    }
    conn.query('SELECT * FROM Motorista', (error, result, field) => {
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
router.get('/driver/:id', (req, res, next) => {
  mysql2.getConnection((err, conn) => {
    if (err) {
      returnres.status(500).send({ error: err });
    }
    conn.query(
      'SELECT * FROM Motorista where motorista_id = ?;',
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

// patch
router.patch('/driver/:id', (req, res, next) => {
  const {
    nome,
    telefone,
    cpf,
    endereco,
    antt,
    crlv,
    cnh,
    caminhao,
    carroceria,
    banco,
    agencia,
    conta,
    pix,
  } = req.body;

  mysql2.getConnection((err, conn) => {
    if (err) {
      returnres.status(500).send({ error: err });
    }
    conn.query(
      `UPDATE Motorista
      SET nome = ?,
      telefone = ?,
      cpf = ?,
      endereco = ?,
      antt = ?,
      crlv = ?,
      cnh = ?,
      caminhao = ?,
      carroceria = ?,
      banco = ?,
      agencia = ?,
      conta = ?,
      pix = ?
      WHERE motorista_id = ?`,
      [
        nome,
        telefone,
        cpf,
        endereco,
        antt,
        crlv,
        cnh,
        caminhao,
        carroceria,
        banco,
        agencia,
        conta,
        pix,
        req.params.id,
      ],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null,
          });
        }
        return res.status(202).send({
          mensagem: 'Motorista Editado com sucesso',
        });
      }
    );
  });
});

// delete
router.delete('/driver/:id', (req, res, next) => {
  mysql2.getConnection((err, conn) => {
    if (err) {
      returnres.status(500).send({ error: err });
    }
    conn.query(
      'DELETE FROM Driver where driver_id = ?;',
      [req.params.id],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(202).send({
          mensagem: 'Motorista deletado com sucesso',
        });
      }
    );
  });
});

// Gett All Drivers with routes
router.get('/drivers/routes', (req, res, next) => {
  mysql2.getConnection((err, conn) => {
    if (err) {
      returnres.status(500).send({ error: err });
    }
    conn.query(
      `select m.motorista_id, m.nome, m.telefone, r.origem, r.destino from Motorista m
        join RotaMotorista rd on m.motorista_id = rd.motorista_id
        join Rota r on rd.rota_id = r.rota_id;`,
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
