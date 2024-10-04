interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
type Rating = 1 | 2 | 3;

const TARGET_MIN = 0.5;

export const parseCalculateExercisesArgs = (): [number[], number] => {
  const [, , target, ...exercises] = process.argv;
  const dailyTargetHours = Number(target);
  const hourlyDailyExercises = exercises.map((hoursPerDay) =>
    Number(hoursPerDay)
  );

  if (
    isNaN(dailyTargetHours) ||
    hourlyDailyExercises.some((hours) => isNaN(hours))
  ) {
    throw new Error('Both function arguments should be valid numbers!');
  }

  if (dailyTargetHours < TARGET_MIN) {
    throw new Error('Daily target should be at least 0.5hrs!');
  }

  return [hourlyDailyExercises, dailyTargetHours];
};

const getAverageRating = (
  average: number,
  target: number
): [Rating, string] => {
  if (average > target + TARGET_MIN) {
    return [3, 'very good exercise discipline'];
  }

  if (average > target - TARGET_MIN && average <= target + TARGET_MIN) {
    return [2, 'good exercise discipline'];
  }

  return [1, 'bad exercise discipline'];
};

const calculateExercises = (
  hourlyDailyExercises: number[],
  dailyTargetHours: number
): ExercisesResult => {
  const periodLength = hourlyDailyExercises.length;
  const trainingDaysHours = hourlyDailyExercises.filter(
    (dailyExerciseHours) => dailyExerciseHours > 0
  );
  const totalTrainingHours = trainingDaysHours.reduce(
    (totalTraining, dailyTrainingHours) => totalTraining + dailyTrainingHours,
    0
  );
  const average = totalTrainingHours / periodLength;
  const [rating, ratingDescription] = getAverageRating(
    average,
    dailyTargetHours
  );

  return {
    periodLength,
    trainingDays: trainingDaysHours.length,
    success: rating > 1,
    rating,
    ratingDescription,
    target: dailyTargetHours,
    average,
  };
};

if (require.main === module) {
  console.log(calculateExercises(...parseCalculateExercisesArgs()));
}

export default calculateExercises;
