import { useState } from 'react';
import './Pad.scss';

function Pad({ id, text, handleFunction }) {
  const [classNames, setClassNames] = useState('');

  function handleClick(event) {
    handleFunction(event);
    setClassNames('clicked');
  }

  function onAnimationEnd() {
    setClassNames('');
  }

  return (
    <div 
      id={id}
      className={`pad ${classNames}`}
      onClick={handleClick}
      onAnimationEnd={onAnimationEnd}
    >
      {text}
    </div>
  )
}

export default Pad;