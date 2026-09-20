import '@testing-library/jest-dom';

// Mock matchMedia for jsdom
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock AudioContext for Web Audio API
window.AudioContext = window.AudioContext || window.webkitAudioContext || class {
  createOscillator() {
    return {
      connect() {},
      start() {},
      stop() {},
      frequency: { setValueAtTime() {} }
    };
  }
  createGain() {
    return {
      connect() {},
      gain: { setValueAtTime() {}, linearRampToValueAtTime() {} }
    };
  }
  destination = {};
  currentTime = 0;
};
