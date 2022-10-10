import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../hooks";

const ProductItem = ({ product, onAddProduct, ...props }) => {
  const handleAddProduct = () => {
    onAddProduct(product);
  };
  return (
    <button onClick={handleAddProduct} className="block">
      <img
        src={product.imgurl}
        alt={product.title}
        className="aspect-square w-full rounded object-cover"
      />
      <div className="mt-2">
        <h5 className="font-medium">{product.title}</h5>
        <p className="mt-1 text-sm text-gray-700">{`${product.currency}${product.price}`}</p>
      </div>
    </button>
  );
};

const getTotalPrice = (items) =>
  items.reduce((acc, item) => (acc += item.price), 0);

const ProductList = () => {
  const { tg, onToggleButton } = useTelegram();
  const [products, setProducts] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);

  const onAddProduct = (product) => {
    const alreadyAdded = productsInCart.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = productsInCart.filter((item) => item.id !== product.id);
    } else {
      newItems = [...productsInCart, product];
    }

    setProductsInCart(newItems);

    if (newItems.length === 0) {
      onToggleButton(false);
    } else {
      tg.MainButton.setParams({ text: `Купить за ${getTotalPrice(newItems)}` });
      onToggleButton(true);
    }
  };

  useEffect(() => {
    fetch("https://web-app-tg-omar-server.loca.lt/products", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((json) => setProducts(json));
  }, []);

  const buyProducts = useCallback(() => {
    tg.sendData(
      JSON.stringify({
        products: productsInCart,
        price: getTotalPrice(productsInCart),
      })
    );
  }, [productsInCart]);
  useEffect(() => {
    tg.onEvent("mainButtonClicked", buyProducts);
    return () => {
      tg.offEvent("mainButtonClicked", buyProducts);
    };
  }, [buyProducts]);
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          <div className="flex items-center rounded bg-tg p-8">
            <div className="mx-auto text-center lg:text-left">
              <h2 className="text-2xl font-bold">Одежда</h2>
              <p className="mt-4 max-w-[45ch] text-sm text-tg_hint">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
                cupiditate mollitia saepe vitae libero nobis.
              </p>
              <a
                href="#"
                className="mt-6 inline-block rounded bg-black px-6 py-3 text-sm text-white"
              >
                Посмотреть еще
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onAddProduct={onAddProduct}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
