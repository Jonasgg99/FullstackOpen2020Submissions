interface Error {
  message: string
}

const calculateBmi = (cm : number, kg: number) : string => {
  if (isNaN(cm) || isNaN(kg)) throw new Error('Invalid arguments');

  const bmi = kg / ((cm/100)^2);

  if (bmi < 18.5) return `Underweight`;

  else if (bmi >= 18.5 && bmi <=25) return `Normal (healthy weight)`;
  
  return `Overweight`;
  
};

//Command line
if (process.argv[2] && process.argv[3]) {
  const cm = Number(process.argv[2]);
  const kg = Number(process.argv[3]);
  try {
    console.log(calculateBmi(cm, kg));
  } catch (e) {
    console.log('Error: ', (e as Error).message);  
  }
}

export default calculateBmi;