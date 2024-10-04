const parseCalculateBmiArgs = (): [number, number] => {
  const [, , height, weight] = process.argv;
  const heightInCms = Number(height);
  const weightInKgs = Number(weight);

  if (isNaN(heightInCms) || isNaN(weightInKgs)) {
    throw new Error('Both function arguments should be valid numbers!');
  }

  return [heightInCms, weightInKgs];
};

const calculateBmi = (heightInCms: number, weightInKgs: number): string => {
  const heightInMeters = heightInCms / 100;

  const bmi = Number(
    (weightInKgs / (heightInMeters * heightInMeters)).toFixed(1)
  );

  if (bmi < 18.5) {
    return 'Underweight';
  }

  if (bmi < 25) {
    return 'Normal weight';
  }

  if (bmi < 30) {
    return 'Overweight';
  }

  return 'Obese';
};

if (require.main === module) {
  console.log(calculateBmi(...parseCalculateBmiArgs()));
}

export default calculateBmi;
