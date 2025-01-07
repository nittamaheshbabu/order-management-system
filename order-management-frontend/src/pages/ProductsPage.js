import React, { useState } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
  });

  // Add new product
  const addProduct = () => {
    setProducts([...products, productDetails]);
    setProductDetails({
      name: '',
      price: '',
    });
  };

  return (
    <div>
      <h2>Product Management</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Product Name"
          value={productDetails.name}
          onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productDetails.price}
          onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
        />
        <button onClick={addProduct}>Add Product</button>
      </form>

      <h3>Product List</h3>
      {products.map((product, index) => (
        <div key={index}>
          <p>Product Name: {product.name}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
