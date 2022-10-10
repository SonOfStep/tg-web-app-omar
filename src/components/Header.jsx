import React from "react";
import { useTelegram } from "../hooks";
import Button from "./Button";

const Header = () => {
  const { user, onClose, onToggleButton } = useTelegram();

  return (
    <header>
      {/* <Button onClick={onClose}>Закрыть</Button>
      <Button onClick={onToggleButton}>Переключить</Button> */}
      <span>{user.username}</span>
    </header>
  );
};

export default Header;
