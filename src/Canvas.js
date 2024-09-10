import React, { useRef, useState, useEffect } from 'react';

const Canvas = ({ tool }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [lastPosition, setLastPosition] = useState(null);
  const pixelSize = 16;

  // Define the drawing area (e.g., a central square region)
  const drawingArea = {
    x: 190, // Starting x-coordinate of the allowed drawing area
    y: 200, // Starting y-coordinate of the allowed drawing area
    width: 284, // Width of the drawing area
    height: 274, // Height of the drawing area
  };

  const setCanvasDimensions = () => {
    const canvas = canvasRef.current;
    const deviceDiv = canvas.parentElement;

    // Set canvas width and height based on the parent div's dimensions
    canvas.width = deviceDiv.clientWidth;
    canvas.height = deviceDiv.clientHeight;

    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 1;
    setContext(ctx);
  };

  useEffect(() => {
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  const isWithinDrawingArea = (x, y) => {
    return (
      x >= drawingArea.x &&
      x <= drawingArea.x + drawingArea.width &&
      y >= drawingArea.y &&
      y <= drawingArea.y + drawingArea.height
    );
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize) * pixelSize;
    const y = Math.floor((e.clientY - rect.top) / pixelSize) * pixelSize;

    if (isWithinDrawingArea(x, y)) {
      setLastPosition({ x, y });
      drawSquare(x, y);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };

  const drawSquare = (x, y) => {
    // Only draw if inside the allowed drawing area
    if (!isWithinDrawingArea(x, y)) return;

    if (tool === 'pencil') {
      context.globalCompositeOperation = 'source-over';
      context.fillStyle = '#FFF62A';
    } else if (tool === 'eraser') {
      context.globalCompositeOperation = 'destination-out';
    }

    context.fillRect(x, y, pixelSize, pixelSize);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize) * pixelSize;
    const y = Math.floor((e.clientY - rect.top) / pixelSize) * pixelSize;

    if (isWithinDrawingArea(x, y)) {
      if (lastPosition) {
        const dx = x - lastPosition.x;
        const dy = y - lastPosition.y;
        const distance = Math.max(Math.abs(dx), Math.abs(dy));

        for (let i = 0; i <= distance; i++) {
          const interpolatedX = lastPosition.x + (dx / distance) * i;
          const interpolatedY = lastPosition.y + (dy / distance) * i;
          drawSquare(
            Math.floor(interpolatedX / pixelSize) * pixelSize,
            Math.floor(interpolatedY / pixelSize) * pixelSize
          );
        }
      }

      setLastPosition({ x, y });
    }
  };

  return (
    <div>
      <div className="device">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          style={{ cursor: tool === 'pencil' ? 'crosshair' : 'default' }}
        />
      </div>
    </div>
  );
};

export default Canvas;
