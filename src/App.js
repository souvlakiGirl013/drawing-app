import React, { useState } from 'react';
import Navbar from './Navbar';
import Canvas from './Canvas';
import './App.css';

const App = () => {
  const [tool, setTool] = useState('pencil');

  const selectTool = (selectedTool) => {
    setTool(selectedTool);
  };

  const clearCanvas = () => {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <div className='title'></div>
      <div className='app-container'>
        <Navbar selectTool={selectTool} clearCanvas={clearCanvas} />
        <Canvas tool={tool} />
      </div>
    </>
  );
};

export default App;
