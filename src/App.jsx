import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useTelegram } from "./hooks";
const App = () => {
  const { tg, colorTheme } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, []);
  return (
    <>
      <div className={"font-sans " + colorTheme === "dark" ? "dark" : ""}>
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default App;
