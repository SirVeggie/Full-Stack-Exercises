
console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));

function calculateBmi(height: number, weight: number): string {
    if (isNaN(height) || isNaN(weight)) {
        return 'Please provide valid numbers';
    }
    
    const bmi: number = weight / (height / 100) ** 2;
    
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 25) {
        return "Normal (healthy weight)";
    } else if (bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
}