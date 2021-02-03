import './Operator.scss';

function Operator({ handleOperator, handleResult }) {
  return (
    <div id="operator">
      <div id="add" onClick={handleOperator}>+</div>
      <div id="subtract" onClick={handleOperator}>-</div>
      <div id="multiply" onClick={handleOperator}>*</div>
      <div id="divide" onClick={handleOperator}>/</div>
      <div id="equals" onClick={handleResult}>=</div>
    </div>
  );
}

export default Operator;