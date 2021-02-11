import Pad from './Pad';
import './Numpad.scss';

function Numpad({ handleNumber, handleOperator, handleResult, handleDelete, handleClearAll }) {
  const number = [
    { id: 'one', text: '1' }, { id: 'two', text: '2' }, { id: 'three', text: '3' },
    { id: 'four', text: '4' }, { id: 'five', text: '5' }, { id: 'six', text: '6' },
    { id: 'seven', text: '7' }, { id: 'eight', text: '8' }, { id: 'nine', text: '9' },
    { id: 'zero', text: '0' }, { id: 'decimal', text: '.' }
  ];
  const operator = [
    { id: 'add', text: '+' }, { id: 'subtract', text: '-' },
    { id: 'multiply', text: '×' }, { id: 'divide', text: '÷' },
  ];

  return (
    <div id="numpad">
      { number.map(pad => <Pad key={pad.id} id={pad.id} text={pad.text} handleFunction={handleNumber} />) }
      { operator.map(op => <Pad key={op.id} id={op.id} text={op.text} handleFunction={handleOperator} />) }
      <Pad key="equals" id="equals" text='=' handleFunction={handleResult} />
      <Pad key="del" id="del" text='DEL' handleFunction={handleDelete} />
      <Pad key="ac" id="ac" text='AC' handleFunction={handleClearAll} />
    </div>
  );
}

export default Numpad;