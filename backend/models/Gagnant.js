const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Duplicate the ID field.

let Gagnant = new Schema({
  nom:{
    type: String
  },
  guesses:{
    type: String
  }
});

Gagnant.set('toObject', { virtuals: true })
Gagnant.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Gagnant', Gagnant)
