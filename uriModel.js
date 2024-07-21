const mongoose = require('mongoose');

const uriSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: true
  }
}, { collection: 'mongodb' });

const Uri = mongoose.model('Uri', uriSchema);

module.exports = Uri;

