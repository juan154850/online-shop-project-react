import React from "react";
import "../App.css";
import { Products } from "../Products";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Menu } from "../Menu";

function App() {
  const [products, setProducts] = React.useState([]);
  const [loadingProducts, setLoadingProducts] = React.useState(true);
  const [errorProducts, setErrorProducts] = React.useState(false);

  //petición para traer la lista de productos de la API.
  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const resp = await fetch(`http://127.0.0.1:8000/products`);
        const data = await resp.json();
        setProducts(data);
        setLoadingProducts(false);
      } catch (error) {
        setErrorProducts(true);
        setLoadingProducts(false);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <HashRouter>
        <Menu />
        <Routes>
          <Route
            path="/products"
            element={
              <Products
                products={products}
                loadingProducts={loadingProducts}
                errorProducts={errorProducts}
              />
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
