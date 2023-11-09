const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

mongoose.connect('mongodb://127.0.0.1:27017/cricket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());

const matchSchema = new mongoose.Schema({
  team1: String,
  team2: String,
  score1: String,
  score2: String,
  status: String,
  date: { type: Date, default: Date.now },
   venue: String, 
  m: String,
});

const Match = mongoose.model('Match', matchSchema);

app.post('/add-matches', async (req, res) => {
  try {
    const matchesData = req.body;

    // Check if data already exists in the database
    const existingMatches = await Match.find();
    if (existingMatches.length === 0) {
      const insertedMatches = await Match.insertMany(matchesData);
      res.json(insertedMatches);
    } else {
      res.json(existingMatches);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/get-matches', async (req, res) => {
  try {
    const matches = await Match.find().sort({ date: -1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});
// app.get('/get-matches/:matchId', async (req, res) => {
//   try {
//     const match = await Match.findOne({ _id: req.params.matchId });
//     if (match) {
//       res.json(match);
//     } else {
//       res.status(404).json({ error: 'Match not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});