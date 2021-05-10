interface Summary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

const calculateExercises = ( log: Array<number>, tar: number ) : Summary => {

  const periodLength = log.length;
  const trainingDays = log.filter(hours => hours > 0).length;
  const average = log.reduce((a, b) => a + b, 0) / log.length;
  const success = average >= tar? true : false;
  const rating = average < (0.5 * tar) ? 1 : average < tar ? 2 : 3;
  const ratingDescription = rating === 1 ? 'Needs improvement' : rating === 2 ? 'You\'re getting there' : 'Excellent!';
  const target = tar;

  return {
    periodLength,
    trainingDays,
    average,
    success,
    rating,
    ratingDescription,
    target
  };
};

const target : number =
  Number(process.argv[2]);

const trainingLog : Array<number> = 
  process.argv.slice(3).map(str => Number(str));

console.log(calculateExercises(trainingLog, target));
