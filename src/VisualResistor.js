import React from 'react';
import './VisualResistor.css';

const VisualResistor = ({ bands }) => {
  return (
    <div className="resistor-wrapper">
      <div className="resistor-lead left" />
      <div className="resistor-body">
        {bands.map((color, i) => (
          <div
            key={i}
            className="resistor-band"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="resistor-lead right" />
    </div>
  );
};

export default VisualResistor;
