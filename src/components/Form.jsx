import React, { useState, useEffect, useCallback } from "react";
import { GlobeAltIcon, UserIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { useTelegram } from "../hooks";
const Form = () => {
  const { tg, onToggleButton } = useTelegram();
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const sendDataToTG = useCallback(() => {
    const data = {
      country,
      name,
      phone,
    };

    tg.sendData(JSON.stringify(data));
  }, [country, name, phone]);

  useEffect(() => {
    onToggleButton(true);
    tg.MainButton.setParams({ text: "Отправить данные" });
  }, []);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", sendDataToTG);
    return () => {
      tg.offEvent("mainButtonClicked", sendDataToTG);
    };
  }, [sendDataToTG]);
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Давайте, познакомимся!
        </h1>

        <p className="mt-4 text-tg_hint">
          Введеная Вами информация будет использоваться, чтобы корректно
          распозанать Вас. Заранее, спасибо
        </p>
      </div>
      <form
        className="mx-auto mt-8 mb-0 max-w-md space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="country" className="sr-only">
            Страна
          </label>
          <div className="relative">
            <input
              type="text"
              name="country"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm bg-tg"
              placeholder="Введите страну"
              value={country}
              onInput={(event) => {
                setCountry(event.currentTarget.value);
              }}
            />

            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <GlobeAltIcon className="h-5 w-5 text-gray-400" />
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="name" className="sr-only">
            Фамилия и имя
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm bg-tg"
              placeholder="Введите фамилию и имя"
              value={name}
              onInput={(event) => {
                setName(event.currentTarget.value);
              }}
            />

            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">
            Телефон
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm bg-tg"
              placeholder="Введите номер телефона"
              value={phone}
              onInput={(event) => {
                setPhone(event.currentTarget.value);
              }}
            />

            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
