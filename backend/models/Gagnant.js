import mongoose from 'mongoose';

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


export default mongoose.model('Gagnant', Gagnant)
