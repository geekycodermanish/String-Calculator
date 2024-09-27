import { Operation } from '../enums/operation.enum';

export function detectOperation(delimiter: string): Operation {
    switch (delimiter) {
        case '*':
            return Operation.Multiplication; // If the delimiter is '*', the operation is Multiplication
        case '+':
            return Operation.Addition; // If the delimiter is '+', the operation is Addition
        default:
            return Operation.Addition;  // Default to addition if no specific operator is given
    }
}

// Function to split the input string into a list of numbers based on the provided delimiter
export function extractDelimiter(input: string): { rawDelimiter: string, delimiter: RegExp, numbersSection: string } {
    if (input.startsWith("//")) {
        const delimiterEndIndex = input.indexOf("\n");
        const rawDelimiter = input.substring(2, delimiterEndIndex);
        
        // Escape special regex characters in the delimiter for RegExp construction
        const escapedDelimiter = rawDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        const numbersSection = input.substring(delimiterEndIndex + 1);
        return { rawDelimiter, delimiter: new RegExp(escapedDelimiter), numbersSection };
    }

    return { rawDelimiter: ',', delimiter: /,|\n/, numbersSection: input };
}

// Function to split the input string into a list of numbers based on the provided delimiter
export function splitNumbers(numbers: string, delimiter: RegExp): number[] {
    const numList: number[] = [];
    let currentNumber = '';

    for (let i = 0; i < numbers.length; i++) {
        const char = numbers[i];

        if (char.match(delimiter)) {
            if (currentNumber.trim() !== '') {
                const num = parseInt(currentNumber.trim(), 10);
                if (!isNaN(num)) {
                    numList.push(num);
                }
            }
            currentNumber = ''; // Reset currentNumber for the next number
        } else {
            currentNumber += char; // If not a delimiter, accumulate the character as part of the current number
        }
    }

    if (currentNumber.trim() !== '') {
        const num = parseInt(currentNumber.trim(), 10);
        if (!isNaN(num)) {
            numList.push(num);
        }
    }

    return numList;
}


// Function to validate that there are no negative numbers in the list of numbers
export function validateNoNegatives(numbers: number[]): void {
    const negatives = numbers.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
    }
}