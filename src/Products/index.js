import React from "react";
import "./Products.css"
import { ProductLink } from "./ProductLink";
// import { Outlet } from "react-router-dom"; //se usa para no perder el contenido de una ruta principal.

const Products = ({ products, loadingProducts, errorProducts }) => {
  return (
    <div className="container">
      {loadingProducts ? <p>Loading Products...</p> : null}
      {errorProducts ? <p>An error has occurred.</p> : null}
      <ul>
        {products.map((item) => (
            <li key={item.id}>
            <h2>Name: {item.name}</h2>
            <br></br>
            <img src={item.image} alt={`product: ${item.name}`}></img>
            <br></br>
            <span>Price: ${item.price}</span>
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
