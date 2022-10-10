import React from "react";

const Button = (props) => {
  return (
    <button
      {...props}
      className={"text-tg_button bg-tg_button " + props.className}
    />
  );
};

export default Button;
