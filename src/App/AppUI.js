import React from "react";

const AppUI = ({ products, loadingProducts, errorProducts }) => {
  return (
    <div className="container">
      {loadingProducts ? <p>Loading Products...</p> : null}
      {errorProducts ? <p>An error has occurred.</p> : null}
      {products.length > 0 ? (
        <ul>
          {products.map((item) => (
            <li key={item.id}>
              <h2>Name: {item.name}</h2>
              <br></br>
              <img src={item.image}></img>
              <br></br>
              <span>Price: ${item.price}</span>
              <br></br>
              <span>location: {item.location}</span>
              <br></br>
              <span>Amount: {item.amount}</span>
              <br></br>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export { AppUI };
