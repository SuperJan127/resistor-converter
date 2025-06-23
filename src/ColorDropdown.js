import React from 'react';
import './ColorDropdown.css';

const ColorDropdown = ({ value, onChange, options }) => {
    return (
        <div className="color-dropdown">
            <select
  value={value}
  onChange={(e) => onChange(e.target.value)}
  className="color-select"
  style={{
    backgroundColor: value,
    color: getTextColor(value),
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', // <--- add it here
  }}
            >
                {options.map((color) => (
                    <option
                        key={color}
                        value={color}
                        style={{ backgroundColor: color, color: getTextColor(color) }}
                    >
                        {color}
                    </option>
                ))}
            </select>
        </div>
    );
};

function getTextColor(bgColor) {
    const darkColors = ['black', 'brown', 'blue', 'violet', 'gray'];
    return darkColors.includes(bgColor) ? 'white' : 'black';
}

export default ColorDropdown;
