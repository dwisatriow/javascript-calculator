import { useState } from 'react';
import Numpad from './components/Numpad';
import Operator from './components/Operator';
import Display from './components/Display';
import './App.scss';

function App() {
  // initialize input and output state
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);

  // function handling pressed number
  const handleNumber = (event) => {
    const num = event.target.innerText;

    setInput(prevInput => {
      // prevent input to begin with multiple 0's
      if (num === "0" && /^0/.test(prevInput) && !(/[1-9]+0*$/.test(prevInput)))
        return prevInput;

      // prevent input adding number after a calculation
      if (/=/.test(output.join('')))  
        return prevInput;
        
      // prevent input to have multiple decimals and prevent adding decimal after a calculation
      if (num === "." && (/\./.test(prevInput) || /=/.test(output.join(''))))
        return prevInput;

      // handle point as first input
      if (num === "." && !(prevInput))
        return "0.";

      // prevent number following 0 as first input
      if (/[1-9]/.test(num) && /^0/.test(prevInput) && !(/^0\./.test(prevInput)))
        return prevInput;

      // prevent number following operator on input
      if (/[\+\*\/-]$/.test(prevInput))
        return num;

      // add the number to input
      return prevInput + num;
    });

    setOutput(prevOutput => {
      // prevent output adding number after a calculation
      if (/=/.test(output.join('')))
        return prevOutput;
      
      // prevent adding decimal after a calculation
      if (num === "." && /=/.test(output.join('')))
        return prevOutput;

      // add the number to output
      return prevOutput.concat([num]);
    });
  }

  // function handling pressed operator
  const handleOperator = (event) => {
    const op = event.target.innerText;
    
    setInput(prevInput => {
      // prevent operator as first input
      if (!prevInput) return prevInput;

      // prevent adding sequential same operator to the input
      if (op === prevInput)
        return prevInput;
      
      // start new calculation if previous calculation present
      if (/=/.test(output.join(''))) {
        setOutput([input].concat([op]));
        return op;
      }

        return op;  // add the operator to input
      });
    
    setOutput(prevOutput => {
      // prevent operator as first output
      if (!prevOutput) return prevOutput;

      // handle negatif number following operator
      if (op === "-" && /[\+\*\/-]$/.test(prevOutput) && !(/[\+\*\/-]{2}$/.test(prevOutput)))
        return prevOutput.concat([op]);

      // prevent adding sequential same operator to the output
      if (prevOutput[prevOutput.length - 1] === op)
        return prevOutput;

      // handle changing operator on the input
      if (/[\+\*\/-]$/.test(prevOutput))
        return prevOutput.slice(0, prevOutput.length - 1).concat([op]);

      return prevOutput.concat([op]);
    });
  }

  // converting string to real calculation
  const calculate = (calculationStr) => {
    let calculation = "".concat(calculationStr);

    // handle sequence of minus
    if (/--/.test(calculation))
      calculation = calculation.replace(/(--)/, "+");

    console.log(calculation);
    return new Function('return ' + calculation)();
  }

  // function handling pressed equals
  const handleResult = () => {
    let result;

    // prevent equals as first input
    if (!input) return;

    // prevent multiple equals in calculation
    if (/=/.test(output.join('')))
      return;

    // calculating the result
    if (/[\+\*\/-]$/.test(output.join(''))) {  // prevent operator as the last output before calculating
      setOutput(prevOutput => {
        const newOutput = prevOutput.slice(0, prevOutput.length - 1);
        result = calculate(newOutput.join(''));
        return newOutput
      })
    } else {
      result = calculate(output.join(''));
    }

    setInput(result);
    setOutput(prevOutput => {
      return prevOutput.concat(['=', result]);
    });
  }

  // function handling pressed CE
  const handleClearEntry = () => {
    // prevent clearing entry after calculation completed
    if (/=/.test(output.join('')))
      return;

    setInput("");
    setOutput(prevOutput => prevOutput.slice(0, prevOutput.length - 1));
  }
  
  // function handling pressed AC
  const handleClearAll = () => {
    setInput("");
    setOutput([]);
  }
  
  return (
    <div className="App">
      <Display input={input} output={output} />
      <Numpad handleNumber={handleNumber} handleClearEntry={handleClearEntry} handleClearAll={handleClearAll} />
      <Operator handleOperator={handleOperator} handleResult={handleResult} />
    </div>
  );
}

export default App;
