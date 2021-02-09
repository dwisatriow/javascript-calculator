import './Display.scss';

function Display({ input, output }) {
  return (
    <div id="display-container">
      <p id="output">{output.join('')}</p>
      <p id="display">{input === null ? output[output.length-1] : input ? input : 0}</p>
    </div>
  );
}

export default Display;