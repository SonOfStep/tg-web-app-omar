export const useTelegram = () => {
  const tg = window.Telegram.WebApp;

  const onClose = () => tg.close();
  const onToggleButton = (bool) => {
    if (typeof bool !== "undefined") {
      bool ? tg.MainButton.show() : tg.MainButton.hide();
      return;
    }
    tg.MainButton.isVisible ? tg.MainButton.hide() : tg.MainButton.show();
  };

  return {
    onClose,
    onToggleButton,
    tg,
    user: tg.initDataUnsafe?.user || "",
    colorTheme: tg.colorScheme,
  };
};
