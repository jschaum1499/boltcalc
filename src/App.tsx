import { useState } from 'react';

type Operator = '+' | '-' | '*' | '/';

function App() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const handleDigit = (digit: string) => {
    if (waitingForSecond) {
      setDisplay(digit);
      setWaitingForSecond(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleOperator = (op: Operator) => {
    const current = parseFloat(display);
    if (firstOperand !== null && !waitingForSecond) {
      const result = calculate(firstOperand, current, operator!);
      setDisplay(String(result));
      setFirstOperand(result);
    } else {
      setFirstOperand(current);
    }
    setOperator(op);
    setWaitingForSecond(true);
  };

  const calculate = (a: number, b: number, op: Operator): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 0;
    }
  };

  const handleEquals = () => {
    if (firstOperand === null || operator === null) return;
    const current = parseFloat(display);
    const result = calculate(firstOperand, current, operator);
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const handleDecimal = () => {
    if (waitingForSecond) {
      setDisplay('0.');
      setWaitingForSecond(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const btnBase = 'flex items-center justify-center rounded-full text-xl font-medium transition-all duration-100 active:scale-95 select-none cursor-pointer h-16 w-16';

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-72 rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
        {/* Display */}
        <div className="px-6 pt-10 pb-4 text-right">
          <div
            data-testid="display"
            className="text-white font-light leading-none truncate"
            style={{ fontSize: display.length > 9 ? '2rem' : '3.5rem' }}
          >
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3 px-4 pb-6">
          {/* Row 1 */}
          <button
            onClick={handleClear}
            className={`${btnBase} bg-gray-400 text-gray-900 hover:bg-gray-300`}
          >
            {firstOperand !== null || display !== '0' ? 'C' : 'AC'}
          </button>
          <button
            onClick={handleToggleSign}
            className={`${btnBase} bg-gray-400 text-gray-900 hover:bg-gray-300`}
          >
            +/-
          </button>
          <button
            onClick={handlePercent}
            className={`${btnBase} bg-gray-400 text-gray-900 hover:bg-gray-300`}
          >
            %
          </button>
          <button
            data-testid="btn-/"
            onClick={() => handleOperator('/')}
            className={`${btnBase} ${operator === '/' && waitingForSecond ? 'bg-white text-orange-500' : 'bg-orange-500 text-white hover:bg-orange-400'}`}
          >
            ÷
          </button>

          {/* Row 2 */}
          <button data-testid="btn-7" onClick={() => handleDigit('7')} className={`${btnBase} bg-gray-700 text-white hover:bg-gray-600`}>7</button>
          <button data-testid="btn-8" onClick={() => handleDigit('8')} className={`${btnBase} bg-gray-700 text-white hover:bg-gray-600`}>8</button>
          <button data-testid="btn-9" onClick={() => handleDigit('9')} className={`${btnBase} bg-gray-700 text-white hover:bg-gray-600`}>9</button>
          <button
            data-testid="btn-*"
            onClick={() => handleOperator('*')}
            className={`${btnBase} ${operator === '*' && waitingForSecond ? 'bg-white text-orange-500' : 'bg-orange-500 text-white hover:bg-orange-400'}`}
          >
            ×
          </button>

          {/* Row 3 */}
          <button data-testid="btn-4" onClick={() => handleDigit('4')} className={`${btnBase} bg-gray-700 text-white hover:bg-gray-600`}>4</button>
          <button data-testid="btn-5" onClick={() => handleDigit('5')} className={`${btnBase} bg-gray-700 text-white hover:bg-gray-600`}>5</button>
          <button data-testid="btn-6" onClick={() => handleDigit('6')} className={`${btnBase} bg-gray-700 text-white hover:bg-gray-600`}>6</button>
          <button
            data-testid="btn--"
            onClick={() => handleOperator('-')}
            className={`${btnBase} ${operator === '-' && waitingForSecond ? 'bg-white text-orange-500' : 'bg-orange-500 text-white hover:bg-orange-400'}`}
          >
            −
          </button>

          {/* Row 4 */}
          <button data-testid="btn-1" onClick={() => handleDigit('1')} className={`${btnBase} bg-gray-700 text-white hover:bg-gray-600`}>1</button>
          <button data-testid="btn-2" onClick={() => handleDigit('2')} className={`${btnBase} bg-gray-700 text-white hover:bg-gray-600`}>2</button>
          <button data-testid="btn-3" onClick={() => handleDigit('3')} className={`${btnBase} bg-gray-700 text-white hover:bg-gray-600`}>3</button>
          <button
            data-testid="btn-+"
            onClick={() => handleOperator('+')}
            className={`${btnBase} ${operator === '+' && waitingForSecond ? 'bg-white text-orange-500' : 'bg-orange-500 text-white hover:bg-orange-400'}`}
          >
            +
          </button>

          {/* Row 5 */}
          <button
            data-testid="btn-0"
            onClick={() => handleDigit('0')}
            className={`${btnBase} col-span-2 w-full rounded-full bg-gray-700 text-white hover:bg-gray-600 justify-start px-6`}
          >
            0
          </button>
          <button onClick={handleDecimal} className={`${btnBase} bg-gray-700 text-white hover:bg-gray-600`}>.</button>
          <button
            data-testid="btn-="
            onClick={handleEquals}
            className={`${btnBase} bg-orange-500 text-white hover:bg-orange-400`}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
