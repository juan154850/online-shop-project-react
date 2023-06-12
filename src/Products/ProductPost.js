import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductPost = () => {

  const navigate = useNavigate()
  const { slug } = useParams();
  //llamamos la API con ese ID específico para traer el contenido del producto.
  const [product, setProduct] = React.useState([]);
  const [onLoading, setOnLoading] = React.useState(true);
  const [onError, setOnError] = React.useState(false);

  useEffect(() => {
    const getProductByID = async () => {
      try {
        const resp = await fetch(
          `http://127.0.0.1:8000/products/id?value=${slug}`
        );
        const data = await resp.json();
        setProduct(data);
        setOnLoading(false);
        setOnError(false);
      } catch (error) {
        setOnError(true);
        setOnLoading(false);
      }
    };
    getProductByID();
  }, [slug]);

  const returnToProducts = () => {
    navigate('/products');
  }


  return (
    <div className="ProductPost-container">
      {onLoading ? <p>Loading the product...</p> : null}
      {onError ? <p>An error has occurred.</p> : null}
      {product.map((item) => (
        <div key={slug}>
          <h2>Name: {item.name}</h2>
          <br></br>
          <img
            src={item.image}
            alt={`product: ${item.name}`}></img>
          <br></br>
          <span>Price: ${item.price}</span>
          <br></br>
          <span>location: {item.location}</span>
          <br></br>
          <span>Amount: {item.amount}</span>
          <br></br>
          <button onClick={returnToProducts}>See all products</button>
        </div>
      ))}
    </div>
  );
};

export { ProductPost };
