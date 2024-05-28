const db = require('../database/connect');

const accountController = {
  create: (req, res) => {
    console.log(req.body);

    const { banco, agencia, conta, nome, cpf, pix } = req.body;
    db.query(
      `INSERT INTO Conta(banco,agencia,conta,nome,cpf,pix) VALUES ('${banco}', '${agencia}', '${conta}', '${nome}', '${cpf}', '${pix}')`,
      (err, result) => {
        if (err) {
          console.log('Error creating the driver:', err);
          return res.status(500).send('Error creating the driver');
        }
        return res.status(201).send('Driver created successfully');
      }
    );
  },
  getAll: (req, res) => {
    db.query('SELECT * FROM Conta', (err, result) => {
      if (err) {
        console.log('Error getting the drivers:', err);
        return res.status(500).send('Error getting the drivers');
      }
      return res.status(200).json(result);
    });
  },
  getById: (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM Conta WHERE conta_id =${id}`, (err, result) => {
      if (err) {
        console.log('Error getting the driver:', err);
        return res.status(500).send('Error getting the driver');
      }
      return res.status(200).json(result);
    });
  },
};

module.exports = accountController;
