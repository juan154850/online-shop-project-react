import React from "react";
import { Link } from "react-router-dom";

const ProductLink = ({ product}) => {
    return <Link to={ `/products/${product}`}>More details</Link>;
};

export { ProductLink };
