import { Operation } from './enums/operation.enum';
import {
    detectOperation,
    extractDelimiter, 
    splitNumbers, 
    validateNoNegatives, 
} from './helpers/stringCalculator.helper';

export function StringCalculator(input: string): number {
    if (!input) { // If the input string is empty, return 0 as the result
        return 0;
    }

  // Extract the raw delimiter, formatted delimiter, and the section of the input containing the numbers
    const { rawDelimiter, delimiter, numbersSection } = extractDelimiter(input);

    // Detect the type of operation (Addition, Multiplication, etc.) based on the raw delimiter
    const operation = detectOperation(rawDelimiter);

    // Split the numbers in the input string using the identified delimiter
    const numList = splitNumbers(numbersSection, delimiter);

    // Validate the list of numbers to ensure no negative numbers are present (throws an error if found)
    validateNoNegatives(numList);

    // Apply the detected operation on the list of numbers and return the result
    return applyOperation(numList, operation);
}


// Function to apply the appropriate operation (Addition or Multiplication) on the list of numbers
function applyOperation(numbers: number[], operation: Operation): number {
    switch (operation) {
        case Operation.Multiplication:
            return numbers.reduce((product, num) => product * num, 1);
        case Operation.Addition:
        default:
            return numbers.reduce((sum, num) => sum + num, 0);
    }
}
