const mongoose = require('mongoose');

const variableSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  }
});

const Variable = mongoose.model('Variable', variableSchema);

module.exports = Variable;
