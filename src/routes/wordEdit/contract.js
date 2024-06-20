const express = require('express');
const router = express.Router();

router.post('/contract/driver', (req, res, next) => {
  const {
    nome,
    antt,
    cpf,
    rg,
    categoria,
    endereco,
    enderecoColeta,
    enderecoEntrega,
    placa,
    chassi,
    valor,
    valorExtenso,
    banco,
    agencia,
    conta,
    data,
  } = req.body;

  const PizZip = require('pizzip');
  const Docxtemplater = require('docxtemplater');
  const fs = require('fs');
  const path = require('path');
  const content = fs.readFileSync(
    path.resolve(__dirname, 'contratoMotorista.docx'),
    'binary'
  );
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  doc.render({
    nome,
    antt,
    cpf,
    rg,
    categoria,
    endereco,
    enderecoColeta,
    enderecoEntrega,
    placa,
    chassi,
    valor,
    valorExtenso,
    banco,
    agencia,
    conta,
    data,
  });
  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });
  const date = new Date().toISOString();
  fs.writeFileSync(
    path.resolve(__dirname, `../../../docs/${date}-${nome}.docx`),
    buf
  );

  return res.status(200).send({
    response: 'Contrato gerado com sucesso',
    path: `https://anatonelly-cadastros-server.onrender.com/docs/${date}-${nome}.docx`,
  });
});

router.post('/contract/boss', (req, res, next) => {
  const {
    nomeMotorista,
    cpfMotorista,
    rgMotorista,
    categoria,
    contratante,
    cpfCNPJ,
    antt,
    endereco,
    enderecoColeta,
    enderecoEntrega,
    placa,
    chassi,
    valor,
    valorExtenso,
    banco,
    agencia,
    conta,
    data,
  } = req.body;

  const PizZip = require('pizzip');
  const Docxtemplater = require('docxtemplater');
  const fs = require('fs');
  const path = require('path');
  const content = fs.readFileSync(
    path.resolve(__dirname, 'contratoContratante.docx'),
    'binary'
  );
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  doc.render({
    nomeMotorista,
    cpfMotorista,
    rgMotorista,
    categoria,
    contratante,
    cpfCNPJ,
    antt,
    endereco,
    enderecoColeta,
    enderecoEntrega,
    placa,
    chassi,
    valor,
    valorExtenso,
    banco,
    agencia,
    conta,
    data,
  });
  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });
  const date = new Date().toISOString();
  fs.writeFileSync(
    path.resolve(__dirname, `../../../docs/${date}-${contratante}.docx`),
    buf
  );

  return res.status(200).send({
    response: 'Contrato gerado com sucesso',
    path: `https://anatonelly-cadastros-server.onrender.com/docs/${date}-${contratante}.docx`,
  });
});

module.exports = router;
