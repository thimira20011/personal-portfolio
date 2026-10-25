import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import AmbientBackground from './AmbientBackground';

test('draws the particle texture once without scheduling a canvas render loop', () => {
  const context = { setTransform: jest.fn(), clearRect: jest.fn(), beginPath: jest.fn(), arc: jest.fn(), fill: jest.fn() };
  const getContext = jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
  const frame = jest.spyOn(window, 'requestAnimationFrame');
  const container = document.createElement('div');
  const root = createRoot(container);
  global.IS_REACT_ACT_ENVIRONMENT = true;
  try {
    act(() => root.render(<AmbientBackground isDarkMode={false} />));
    expect(context.clearRect).toHaveBeenCalledTimes(1);
    expect(context.arc).toHaveBeenCalled();
    expect(frame).not.toHaveBeenCalled();
    act(() => window.dispatchEvent(new Event('resize')));
    expect(context.clearRect).toHaveBeenCalledTimes(2);
    act(() => root.render(<AmbientBackground isDarkMode />));
    expect(context.fillStyle).toBe('rgba(147,197,253,.42)');
    expect(frame).not.toHaveBeenCalled();
  } finally {
    act(() => root.unmount());
    getContext.mockRestore();
    frame.mockRestore();
  }
});
