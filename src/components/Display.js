import './Display.scss';

function Display({ input, output }) {
  const displayOutput = output.join('');

  return (
    <div id="display-container">
      <p id="output">{ displayOutput }</p>
      <p id="display">{ input === null ? output[output.length-1] : input ? input : 0 }</p>
    </div>
  );
}

export default Display;