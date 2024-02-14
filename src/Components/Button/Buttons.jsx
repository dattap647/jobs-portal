import React from "react";
import "./buttons.css";
function Buttons({
  name,
  type,

  bgcolor = "--secondary_color",
  colors,
  onClick,
  disabled,
}) {
  const color = colors
    ? colors
    : bgcolor === "--secondary_color"
    ? "--white"
    : "--secondary_color";
  return (
    <button
      type={type}
      disabled={disabled}
      className={`button`}
      style={{
        backgroundColor: `var(${bgcolor})`,
        color: disabled ? `var(--gray_500)` : `var(${color})`,
        borderColor: disabled ? `var(--gray_500)` : `var(${color})`,
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
export default Buttons;
