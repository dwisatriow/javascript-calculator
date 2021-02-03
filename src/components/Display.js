import './Display.scss';

function Display({ input, output, gettingInput }) {
  return (
    <div id="display-container">
      <p id="output">{output}</p>
      <p id="display">{input ? input : 0}</p>
    </div>
  );
}

export default Display;