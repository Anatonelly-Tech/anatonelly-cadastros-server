const db = require('../database/connect');

const DriverController = {
  create: (req, res) => {
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
      conta_id,
    } = req.body;

    db.query(
      `INSERT INTO Driver(nome,telefone,cpf,endereco,antt,crlv,cnh,caminhao,carroceria,conta_id) VALUES ('${nome}', '${telefone}', '${cpf}', '${endereco}', '${antt}', '${crlv}', '${cnh}', '${caminhao}', '${carroceria}', '${conta_id}')`,
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
    db.query('SELECT * FROM Driver', (err, result) => {
      if (err) {
        console.log('Error getting the drivers:', err);
        return res.status(500).send('Error getting the drivers');
      }
      return res.status(200).json(result);
    });
  },
  getById: (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM Driver WHERE driver_id =${id}`, (err, result) => {
      if (err) {
        console.log('Error getting the driver:', err);
        return res.status(500).send('Error getting the driver');
      }
      return res.status(200).json(result);
    });
  },
};

module.exports = DriverController;
