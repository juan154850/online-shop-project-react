import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLoading } from "../Messages/AppLoading";
import { AppError } from "../Messages/AppError";
import { useAuth } from "../Auth/index";

const ProductPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const auth = useAuth();

  //llamamos la API con ese ID específico para traer el contenido del producto.
  const [product, setProduct] = React.useState([]);
  const [onLoading, setOnLoading] = React.useState(true);
  const [onError, setOnError] = React.useState(false);

  useEffect(() => {
    const getProductByID = async () => {
      try {
        const resp = await fetch(`http://127.0.0.1:8000/products/id?value=${slug}`);
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
    navigate("/products");
  };

  const editProduct = () => {
    console.log(`Redirigiendo a la ruta en la cual se editan los productos.`);
  };

  // this function remove an object in the data base.
  const deleteProduct = async () => {        
    const deleteProductDB = async () => {
      const resp = await fetch(`http://localhost:8000/products/${slug}`, {
        headers: {
          accept: "application/json",
          "accept-language": "es-ES,es;q=0.9",
          authorization: `Bearer ${auth.authCookie.authCookie.access_token}`,
        },
        body: null,
        method: "DELETE",
      });
      if (resp.ok) {
        navigate(`/products`);
      }
    };

    await deleteProductDB();
  };

  return (
    <div className="ProductPost-container">
      {onLoading ? <AppLoading /> : null}
      {onError ? <AppError message={`An error has occurred.`} /> : null}
      {product.map((item) => (
        <div key={slug}>
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
          <button onClick={returnToProducts}>See all products</button>
          {auth.user?.role === "admin" && (
            <>
              <button onClick={editProduct}>Edit product</button>
              <button onClick={deleteProduct}>Delete product</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export { ProductPost };
