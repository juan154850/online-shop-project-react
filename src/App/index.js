import React from "react";
import "../App.css";
import { AppUI } from "./AppUI";

function App() {

    const [products, setProducts] = React.useState([]);
    const [loadingProducts, setLoadingProducts] = React.useState(true);
    const [errorProducts, setErrorProducts] = React.useState(false)

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
      <AppUI
        products={products}
        loadingProducts={loadingProducts}
        errorProducts={errorProducts}
      />
    );
}

export default App;
