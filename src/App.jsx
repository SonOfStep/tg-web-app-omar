import React, { useEffect } from "react";
const tg = window.Telegram.WebApp;
const App = () => {
  useEffect(() => {
    tg.ready();
  }, []);
  const onClose = () => {
    tg.close();
  };
  return (
    <>
      <h1 className="text-3xl">App</h1>
      <button onClick={onClose}>Закрыть</button>
    </>
  );
};

export default App;
