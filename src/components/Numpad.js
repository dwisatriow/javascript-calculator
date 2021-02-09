import './Numpad.scss';

function Numpad({ handleNumber, handleOperator, handleResult, handleDelete, handleClearAll }) {
  return (
    <div id="numpad">
      <div id="zero" className="pad" onClick={handleNumber}>0</div>
      <div id="one" className="pad" onClick={handleNumber}>1</div>
      <div id="two" className="pad" onClick={handleNumber}>2</div>
      <div id="three" className="pad" onClick={handleNumber}>3</div>
      <div id="four" className="pad" onClick={handleNumber}>4</div>
      <div id="five" className="pad" onClick={handleNumber}>5</div>
      <div id="six" className="pad" onClick={handleNumber}>6</div>
      <div id="seven" className="pad" onClick={handleNumber}>7</div>
      <div id="eight" className="pad" onClick={handleNumber}>8</div>
      <div id="nine" className="pad" onClick={handleNumber}>9</div>
      <div id="decimal" className="pad" onClick={handleNumber}>.</div>

      <div id="add" className="pad" onClick={handleOperator}>+</div>
      <div id="subtract" className="pad" onClick={handleOperator}>-</div>
      <div id="multiply" className="pad" onClick={handleOperator}>×</div>
      <div id="divide" className="pad" onClick={handleOperator}>÷</div>
      <div id="equals" className="pad" onClick={handleResult}>=</div>
      
      <div id="del" className="pad" onClick={handleDelete}>DEL</div>
      <div id="ac" className="pad" onClick={handleClearAll}>AC</div>
    </div>
  );
}

export default Numpad;