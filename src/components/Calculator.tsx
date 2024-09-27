import React, { useState } from 'react';
import '../styles/Calculator.css';
import { StringCalculator } from '../StringCalculator'; // Importing the StringCalculator function that performs the calculations

const Calculator: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | string>('');
  const handleCalculate = () => {
    try {
      setResult(StringCalculator(input)); // If successful, call the StringCalculator with the user's input and update the result state
    } catch (error) {
      setResult((error as Error).message);
    }
  };

  return (
    <div className="calculator-container">
      <h1>String Calculator</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers"
        className="calculator-input"
      />
      <button onClick={handleCalculate} className="calculator-button">
        Calculate
      </button>
      <div className="calculator-result">Result: {result}</div>
    </div>
  );
};

export default Calculator;
