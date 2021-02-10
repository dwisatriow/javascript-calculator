import { useState } from 'react';
import './Pad.scss';

function Pad({ id, text, handleFunction }) {
  const [classNames, setClassNames] = useState('');
  const [animation, setAnimation] = useState(false);

  function handleClick(event) {
    handleFunction(event);
    setClassNames('clicked');
  }

  function onAnimationStart() {
    // setAnimation(true);
  }

  function onAnimationEnd() {
    setClassNames('');
  }

  return (
    <div 
      id={id}
      className={`pad ${classNames}`}
      onClick={handleClick}
      onAnimationStart={onAnimationStart}
      onAnimationEnd={onAnimationEnd}
    >
      {text}
    </div>
  )
}

export default Pad;