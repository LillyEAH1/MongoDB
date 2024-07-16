const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Variable = require('./variableModel'); // Asegúrate de que la ruta sea correcta

const app = express();
const port = 3000;

const MONGO_USER = 'hrpowerbot';
const MONGO_PASSWORD = 'equipodecuatro';
const MONGO_SERVER = 'www.sateav.com';
const MONGO_DB_NAME = 'sateav_4x4';
const MONGO_PORT = '27017';

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_SERVER}:${MONGO_PORT}/${MONGO_DB_NAME}`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.json()); // Middleware para parsear JSON en el cuerpo de las solicitudes

// Rutas
app.get('/', (req, res) => {
  res.send('API is working!');
});

app.get('/variables', async (req, res) => {
  try {
    const variables = await Variable.find();
    res.json(variables);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/variable', async (req, res) => {
  try {
    const newVariable = new Variable({ value: req.body.variable });
    const savedVariable = await newVariable.save();
    res.json({ message: 'Variable creada', variable: savedVariable });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/variable/:id', async (req, res) => {
  try {
    const updatedVariable = await Variable.findByIdAndUpdate(
      req.params.id,
      { value: req.body.variable },
      { new: true }
    );
    res.json({ message: 'Variable actualizada', variable: updatedVariable });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/variable/:id', async (req, res) => {
  try {
    await Variable.findByIdAndDelete(req.params.id);
    res.json({ message: 'Variable eliminada' });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
