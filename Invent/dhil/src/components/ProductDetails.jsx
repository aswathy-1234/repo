import React, { useState, useEffect } from "react";
import './pro.css';

function ProductDetails({ setView }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const renderProductDetails = () => (
        <div className="container-fluid bg-2 text-center product-details-page">
            <h1 className="product-title">Browse Our Offerings</h1>
            <br/>
            <div className="card-container">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">Price: ${product.price}</p>
                            <p className="card-text">Quantity: {product.qty}</p>
                            <p className="card-text">
                                Availability: {product.qty > 1 ? 'Stock Available' : product.qty === 1 ? 'Last Item' : 'Stock Out'}
                            </p>
                            <button className="btn-buy-now">Buy Now</button> 
                        </div>
                    </div>
                ))}
            </div>
            <div className="center-btn-container">
               
                <button onClick={() => setView('inventory')} className="btn btn-primary mt-4">Go to Admin Page</button>
            </div>
        </div>
    );

    return (
        <div>
            {renderProductDetails()}
        </div>
    );
}

export default ProductDetails;
