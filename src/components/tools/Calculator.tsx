import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNext, setWaitingForNext] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNext) {
      setDisplay(num);
      setWaitingForNext(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNext(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNext(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNext(false);
  };

  const buttons = [
    ['C', '±', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <Card className="terminal-border max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-primary font-mono flex items-center">
          $ ./calculator.exe<span className="terminal-cursor"></span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Display */}
        <div className="bg-terminal-darker border border-border rounded p-4">
          <div className="text-right text-2xl font-mono text-primary terminal-glow min-h-[2rem] overflow-hidden">
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid gap-2">
          {buttons.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-2">
              {row.map((btn) => (
                <Button
                  key={btn}
                  variant={['/', '*', '-', '+', '='].includes(btn) ? 'default' : 'secondary'}
                  className={`h-12 font-mono ${
                    btn === '0' ? 'col-span-2' : ''
                  } ${
                    ['/', '*', '-', '+', '='].includes(btn) 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => {
                    if (btn === 'C') {
                      clear();
                    } else if (btn === '=') {
                      performCalculation();
                    } else if (['+', '-', '*', '/'].includes(btn)) {
                      inputOperation(btn);
                    } else if (btn === '±') {
                      setDisplay(String(parseFloat(display) * -1));
                    } else if (btn === '%') {
                      setDisplay(String(parseFloat(display) / 100));
                    } else {
                      inputNumber(btn);
                    }
                  }}
                >
                  {btn}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;