const express = require('express');
const mysql2 = require('../database/connect').pool;
const router = express.Router();

// Post
router.post('/route', (req, res, next) => {
  const { origem, destino, motorista_id } = req.body;
  mysql2.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      'INSERT INTO Rota(origem, destino) VALUES (?, ?)',
      [origem, destino],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }

        const rota_id = result.insertId;
        conn.query(
          'INSERT INTO RotaMotorista(rota_id, motorista_id) VALUES (?, ?)',
          [rota_id, motorista_id],
          (error, result, field) => {
            conn.release();
            if (error) {
              return res.status(500).send({ error: error });
            }
          }
        );

        res.status(201).send({
          message: 'Route successfully registered',
          rota_id: result.insertId,
        });
      }
    );
  });
});

// Get
router.get('/route', (req, res, next) => {
  mysql2.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query('SELECT * FROM Rota', (error, result, field) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error });
      }
      return res.status(200).send({ response: result });
    });
  });
});

// GetById
router.get('/route/getById/:id', (req, res, next) => {
  mysql2.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      'SELECT * FROM Rota where rota_id = ?;',
      [req.params.id],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({ response: result });
      }
    );
  });
});

// Delete
router.delete('/route/:id', (req, res, next) => {
  mysql2.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      'DELETE FROM Rota WHERE rota_id = ?;',
      [req.params.id],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(202).send({ message: 'Route deleted successfully' });
      }
    );
  });
});

// Rotas por motorista
router.get('/route/driver/:id', (req, res, next) => {
  mysql2.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `select m.nome, r.origem, r.destino from Motorista m
        join RotaMotorista rd on m.motorista_id = rd.motorista_id
        join Rota r on rd.rota_id = r.rota_id
        WHERE m.motorista_id = ?;`,
      [req.params.id],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({ response: result });
      }
    );
  });
});

// Motorista por destino
router.get('/route/destination', (req, res, next) => {
  const { destino } = req.body;

  mysql2.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `select m.nome, r.origem, r.destino from Motorista m
          join RotaMotorista rd on m.motorista_id = rd.motorista_id
          join Rota r on rd.rota_id = r.rota_id
          WHERE r.destino = ?;`,
      [destino],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({ response: result });
      }
    );
  });
});

// Motorista por origem
router.get('/route/origin', (req, res, next) => {
  const { origem } = req.body;
  mysql2.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `select m.nome, r.origem, r.destino from Motorista m
          join RotaMotorista rd on m.motorista_id = rd.motorista_id
          join Rota r on rd.rota_id = r.rota_id
          WHERE r.origem = ?;`,
      [origem],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({ response: result });
      }
    );
  });
});

// Motorista por origem e destino
router.get('/route/origin/destination', (req, res, next) => {
  const { origem, destino } = req.body;

  mysql2.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `select m.nome, r.origem, r.destino from Motorista m
          join RotaMotorista rd on m.motorista_id = rd.motorista_id
          join Rota r on rd.rota_id = r.rota_id
          WHERE r.origem = ? AND r.destino = ?;`,
      [origem, destino],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({ response: result });
      }
    );
  });
});

module.exports = router;
