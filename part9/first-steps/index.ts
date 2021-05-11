import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator'
const app = express();
app.use(express.urlencoded( { extended: true}))
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  
  const log = req.body.log
  const tar = req.body.tar
  
  const result = calculateExercises(log, tar)
  res.send(JSON.stringify(result))
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);  
  
  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({
      error: 'missing or invalid query'
    });
  }

  const bmi = calculateBmi(height, weight);

  const toReturn = {
    weight,
    height,
    bmi
  };
  
  res.send(JSON.stringify(toReturn));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});