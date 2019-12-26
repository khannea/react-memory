import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Gagnant from './models/Gagnant.js'

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/gagnants');

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Je suis connecté a mongoose')
});

router.route('/gagnants').get((req, res) => {
  Gagnant.find((err, gagnants) => {
    if (err)
      console.log('erreur');
    else{
            res.json(gagnants);
    }

  })
});

router.route('/gagnants/:id').get((req, res) => {
    Gagnant.findById(req.params.id, (err, categorie) => {
        if (err)
            console.log(err);
        else
            res.json(categorie);
    })
});

router.route('/gagnants/update/:id').post((req, res) => {
    Gagnant.findById(req.params.id, (err, gagnant) => {
        if (!gagnant)
            return next(new Error('Could not load Document'));
        else {
            gagnant.id = req.body.id;
            gagnant.nom = req.body.nom;
            gagnant.guesses = req.body.guesses;

            gagnant.save().then(gagnant => {
                res.json(gagnant);
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/add').post((req, res) => {
    console.log(req)
    let gagnant = new Gagnant(req.body);
    gagnant.save()
        .then(gagnant => {
            res.status(200).json({'gagnant': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

app.use('/', router);

app.listen(4000, () => console.log('Serveur Express sur le port 4000'));
