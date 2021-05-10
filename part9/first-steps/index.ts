import express from 'express';
import calculateBmi from './bmiCalculator';
//import calculateBmi from './bmiCalculator'
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);

  const toReturn = {
    weight,
    height,
    bmi
  };
  
  res.send(JSON.stringify(toReturn));
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});