import './Numpad.scss';

function Numpad({ handleNumber, handleClearEntry, handleClearAll }) {
  return (
    <div id="numpad">
      <div id="zero" onClick={handleNumber}>0</div>
      <div id="one" onClick={handleNumber}>1</div>
      <div id="two" onClick={handleNumber}>2</div>
      <div id="three" onClick={handleNumber}>3</div>
      <div id="four" onClick={handleNumber}>4</div>
      <div id="five" onClick={handleNumber}>5</div>
      <div id="six" onClick={handleNumber}>6</div>
      <div id="seven" onClick={handleNumber}>7</div>
      <div id="eight" onClick={handleNumber}>8</div>
      <div id="nine" onClick={handleNumber}>9</div>
      <div id="decimal" onClick={handleNumber}>.</div>
      <div id="ce" onClick={handleClearEntry}>CE</div>
      <div id="ac" onClick={handleClearAll}>AC</div>
    </div>
  );
}

export default Numpad;