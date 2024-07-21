const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  collection: {
    type: String,
    required: true
  },
  filter: {
    id: {
      type: String,
      required: true
    }
  },
  values: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    flag: {
      type: String,
      required: true
    },
    live: {
      type: String,
      required: true
    },
    sandbox: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  }
}, { collection: 'mongodb' });

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;
