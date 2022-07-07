
const exercises = calculateExercise(process.argv.slice(3).map(x => Number(x)), Number(process.argv[2]));
if (exercises) {
    console.log(exercises);
} else {
    console.log('Please provide valid numbers');
}

type ExerciseType = {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
};

function calculateExercise(hours: number[], target: number): ExerciseType {
    if (isNaN(target) || hours.some(x => isNaN(x))) {
        return null;
    }
    
    const average = hours.reduce((a, b) => a + b, 0) / hours.length;
    const days = hours.reduce((acc, curr) => acc + (curr > 0 ? 1 : 0), 0);
    const rating = getRating(average, target);
    
    const exercise: ExerciseType = {
        periodLength: hours.length,
        trainingDays: days,
        success: average >= target,
        rating: rating.value,
        ratingDescription: rating.description,
        target: target,
        average: average
    };

    return exercise;
}

type Rating = {
    value: number;
    description: string;
}

function getRating(average: number, target: number): Rating {
    if (average == 0) {
        return {
            value: 1,
            description: "You're a lost cause"
        };
    } else if (average < target) {
        return {
            value: 2,
            description: "Try harder next time"
        };
    } else if (average >= target) {
        return {
            value: 3,
            description: "Not bad, punk"
        };
    }
}