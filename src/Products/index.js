import React from "react";
import "./Products.css";
import { ProductLink } from "./ProductLink";
import { AppLoading } from "../Messages/AppLoading";
import { AppError } from "../Messages/AppError";
// import { Outlet } from "react-router-dom"; //se usa para no perder el contenido de una ruta principal.

const Products = () => {
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
  }, [products]);

  return (
    <div className="container">
      {loadingProducts ? <AppLoading /> : null}
      {errorProducts ? <AppError message={`An error has ocurred during the process.`} /> : null}
      <ul>
        {products.map((item) => (
          <li key={item.id}>
            <h2>Name: {item.name}</h2>
            <br></br>
            <img src={item.image} alt={`product: ${item.name}`}></img>
            <br></br>
            <span>Price: {item.price}</span>
            <br></br>
            <span>location: {item.location}</span>
            <br></br>
            <span>Amount: {item.amount}</span>
            <br></br>
            <ProductLink product={item.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Products };
