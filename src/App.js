import { useState } from 'react';
import Numpad from './components/Numpad';
import Operator from './components/Operator';
import Display from './components/Display';
import './App.scss';

function App() {
  // initialize input and output state
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // function handling pressed number
  const handleNumber = (event) => {
    const num = event.target.innerText;

    setInput(prevInput => {
      // prevent input to begin with multiple 0's
      if (num === "0" && /^0/.test(prevInput) && !(/[1-9]+0*$/.test(prevInput)))
        return prevInput;

      // prevent input adding number after a calculation
      if (/=/.test(output))  
        return prevInput;
        
      // prevent input to have multiple decimals and prevent adding decimal after a calculation
      if (num === "." && (/\./.test(prevInput) || /=/.test(output)))
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
      if (/=/.test(output))
        return prevOutput;
      
      // prevent adding decimal after a calculation
      if (num === "." && /=/.test(output))
        return prevOutput;

      // add the number to output
      return prevOutput + num
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
      if (/=/.test(output)) {
        setOutput(input + op);
        return op;
      }

        return op;  // add the operator to input
      });
    
    setOutput(prevOutput => {
      // prevent operator as first output
      if (!prevOutput) return prevOutput;

      // handle negatif number following operator
      if (op === "-" && /[\+\*\/-]$/.test(prevOutput) && !(/[\+\*\/-]{2}$/.test(prevOutput)))
        return prevOutput + op;

      // prevent adding sequential same operator to the output
      if (prevOutput.charAt(prevOutput.length - 1) === op)
        return prevOutput;

      // handle changing operator on the input
      if (/[\+\*\/-]$/.test(prevOutput))
        return prevOutput.slice(0, prevOutput.length - 1) + op;

      return prevOutput + op;
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
    if (/=/.test(output))
      return;

    // calculating the result
    if (/[\+\*\/-]$/.test(output)) {  // prevent operator as the last output before calculating
      setOutput(prevOutput => {
        const newOutput = prevOutput.slice(0, prevOutput.length - 1);
        result = calculate(newOutput);
        return newOutput
      })
    } else {
      result = calculate(output);
    }

    setInput(result);
    setOutput(prevOutput => {
      return prevOutput + '=' + result;
    });
  }

  // function handling pressed AC
  const handleClear = () => {
    setInput("");
    setOutput("");
  }
  
  return (
    <div className="App">
      <Display input={input} output={output} />
      <Numpad handleNumber={handleNumber} handleClear={handleClear} />
      <Operator handleOperator={handleOperator} handleResult={handleResult} />
    </div>
  );
}

export default App;
