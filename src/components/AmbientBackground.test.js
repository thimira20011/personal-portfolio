import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import AmbientBackground from './AmbientBackground';

test('suspends ambient motion on pause, hidden tabs and system preference changes', () => {
  let hidden = false;
  let onPreference;
  const preference = { matches: false, addEventListener: jest.fn((_, callback) => { onPreference = callback; }), removeEventListener: jest.fn() };
  const originalMedia = window.matchMedia;
  window.matchMedia = jest.fn(() => preference);
  const visibility = jest.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden);
  const container = document.createElement('div');
  const root = createRoot(container);
  global.IS_REACT_ACT_ENVIRONMENT = true;
  try {
    act(() => root.render(<AmbientBackground />));
    expect(container.firstChild.dataset.running).toBe('true');
    act(() => root.render(<AmbientBackground paused />));
    expect(container.firstChild.dataset.running).toBe('false');
    act(() => root.render(<AmbientBackground />));
    hidden = true;
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(container.firstChild.dataset.running).toBe('false');
    hidden = false;
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(container.firstChild.dataset.running).toBe('true');
    preference.matches = true;
    act(() => onPreference());
    expect(container.firstChild.dataset.running).toBe('false');
  } finally {
    act(() => root.unmount());
    expect(preference.removeEventListener).toHaveBeenCalledWith('change', onPreference);
    window.matchMedia = originalMedia;
    visibility.mockRestore();
  }
});
