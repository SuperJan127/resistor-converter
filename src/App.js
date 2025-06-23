import React, { useState } from 'react';
import './App.css';
import ColorDropdown from './ColorDropdown';
import VisualResistor from './VisualResistor';

const colorCodes = {
  black: { digit: 0, multiplier: 1 },
  brown: { digit: 1, multiplier: 10 },
  red: { digit: 2, multiplier: 100 },
  orange: { digit: 3, multiplier: 1_000 },
  yellow: { digit: 4, multiplier: 10_000 },
  green: { digit: 5, multiplier: 100_000 },
  blue: { digit: 6, multiplier: 1_000_000 },
  violet: { digit: 7, multiplier: 10_000_000 },
  gray: { digit: 8, multiplier: 100_000_000 },
  white: { digit: 9, multiplier: 1_000_000_000 },
  gold: { digit: null, multiplier: 0.1 },
  silver: { digit: null, multiplier: 0.01 }
};

const bandColorsDefault = {
  4: ['brown', 'black', 'red', 'gold'],
  5: ['brown', 'black', 'black', 'red', 'gold'],
  6: ['brown', 'black', 'black', 'red', 'gold', 'brown']
};

const formatResistance = (resistance) => {
  if (resistance >= 1_000_000) {
    return (resistance / 1_000_000).toFixed(2) + ' MΩ';
  } else if (resistance >= 1_000) {
    return (resistance / 1_000).toFixed(2) + ' kΩ';
  } else {
    return resistance + ' Ω';
  }
};

const getBandLabels = (count) => {
  if (count === 4) return ['Digit 1', 'Digit 2', 'Multiplier', 'Tolerance'];
  if (count === 5) return ['Digit 1', 'Digit 2', 'Digit 3', 'Multiplier', 'Tolerance'];
  if (count === 6) return ['Digit 1', 'Digit 2', 'Digit 3', 'Multiplier', 'Tolerance', 'Temp. Coeff.'];
  return [];
};

function App() {
  const [bandCount, setBandCount] = useState(4);
  const [bandColors, setBandColors] = useState(bandColorsDefault[4]);

  const handleBandCountChange = (e) => {
    const count = parseInt(e.target.value);
    setBandCount(count);
    setBandColors(bandColorsDefault[count]);
  };

  const handleColorChange = (index, newColor) => {
    const newBands = [...bandColors];
    newBands[index] = newColor;
    setBandColors(newBands);
  };

  const calculateResistance = () => {
    const digits = bandColors.slice(0, bandCount - 2);
    const multiplier = colorCodes[bandColors[bandCount - 2]]?.multiplier ?? 1;
    const digitValue = digits.reduce((val, color, i) => {
      const digit = colorCodes[color]?.digit ?? 0;
      return val * 10 + digit;
    }, 0);
    return digitValue * multiplier;
  };

  return (
    <div className="App">
      <h1>Resistor Color Code Converter</h1>

      <div className="band-selector">
  <label htmlFor="bandCount">Number of Bands:</label>
  <select id="bandCount" value={bandCount} onChange={handleBandCountChange}>
    <option value={4}>4</option>
    <option value={5}>5</option>
    <option value={6}>6</option>
  </select>
</div>
      <VisualResistor bands={bandColors} />
      <div className="color-selector">
        {bandColors.map((color, index) => (
          <div key={index}>
            <label>{getBandLabels(bandCount)[index]}</label>
            <ColorDropdown
              className="color-dropdown"
              value={color}
              onChange={(newColor) => handleColorChange(index, newColor)}
              options={Object.keys(colorCodes)}
            />
          </div>
        ))}
      </div>

      <h2>Resistance: {formatResistance(calculateResistance())}</h2>
    </div>
  );
}

export default App;
