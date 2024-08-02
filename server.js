const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Setting = require('./settingModel'); 
//const TipoDeCuenta = require("./TipoDeCuenta");

const app = express();
const port = 3000;

const MONGO_USER = 'hrpowerbot';
const MONGO_PASSWORD = 'equipodecuatro';
const MONGO_SERVER = 'www.sateav.com';
const MONGO_DB_NAME = 'sateav_4x4';
const MONGO_PORT = '27017';

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_SERVER}:${MONGO_PORT}/${MONGO_DB_NAME}`;


//const cuenta2 = new TipoDeCuenta(987654321, 0, "Lilly Arroyo");

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.json()); // Middleware para parsear JSON en el cuerpo de las solicitudes

// Rutas
app.get('/', (req, res) => {
  res.send('API is working!');
});

//get
app.post('/mongodb/find', async (req, res) => {
  try {
   const { collection, filter } = req.body;
   const settings = await Setting.find({ collection, filter });
   //const settings = cuenta2.estadocuenta();
   //console.log(settings);
    res.json(settings);
    console.log({message:"Simulando un find pero sirviendo en post"});
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/mongodb', async (req, res) => {
  try {
    const { collection, values } = req.body;
    const newSetting = new Setting({ collection, filter: { id: values.id }, values });
    const savedSetting = await newSetting.save();
    res.json({ message: 'Setting created', setting: savedSetting });
    //const {cuantity} = req.body;
    //const settings = cuenta2.abonardinero(cuantity);
    //res.json(settings);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/mongodb', async (req, res) => {
  try {
    const { collection, filter, values } = req.body;
    const updatedSetting = await Setting.findOneAndUpdate(
      { collection, filter },
      { values },
      { new: true }
    );
    res.json({ message: 'Setting updated', setting: updatedSetting });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/mongodb', async (req, res) => {
  try {
    const { collection, filter } = req.body;
    await Setting.findOneAndDelete({ collection, filter });
    res.json({ message: 'Setting deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

