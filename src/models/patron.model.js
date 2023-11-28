const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatronSchema = new Schema({
  name: { type: String, required: true },
  contactDetails: { type: String },
});

const Patron = mongoose.model('Patron', PatronSchema);
module.exports = Patron;