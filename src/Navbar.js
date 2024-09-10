import React from 'react';

const Navbar = ({ selectTool, clearCanvas }) => {
  return (
    <div className="buttons">
      <p>&#91;</p>
      <button className="pencil" onClick={() => selectTool('pencil')}></button>
      <p>or</p>
      <button className="eraser" onClick={() => selectTool('eraser')}></button>
      <p>and you can always</p>
      <button className="clear" onClick={clearCanvas}></button>
      <p>&#93;</p>
    </div>
  );
};

export default Navbar;
