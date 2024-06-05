const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');
// Load the docx file as binary content
const content = fs.readFileSync(
  path.resolve(__dirname, 'contratoMotorista.docx'),
  'binary'
);
const zip = new PizZip(content);
const doc = new Docxtemplater(zip, {
  paragraphLoop: true,
  linebreaks: true,
});
// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
doc.render({
  nome: 'vitorTest',
  antt: 'vitorTest',
  cpf: 'vitorTest',
  rg: 'vitorTest',
  categoria: 'vitorTest',
  endereco: 'vitorTest',
  enderecoColeta: 'vitorTest',
  enderecoEntrega: 'vitorTest',
  placa: 'vitorTest',
  chassi: 'vitorTest',
  valor: 'vitorTest',
  valorExtenso: 'vitorTest',
  banco: 'vitorTest',
  agencia: 'vitorTest',
  conta: 'vitorTest',
  data: 'vitorTest',
});
const buf = doc.getZip().generate({
  type: 'nodebuffer',
  compression: 'DEFLATE',
});
// buf is a nodejs Buffer, you can either write it to a
// file or res.send it with express for example.
fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
