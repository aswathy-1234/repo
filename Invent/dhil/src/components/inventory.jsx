
import React, { useState, useEffect } from "react";
import './inventory.css'; 
import ProductDetails from './ProductDetails'; 

function Inventory({ setView }) {
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [sum, setSum] = useState(0);
    const [view, setLocalView] = useState('add'); 
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        if (view === 'list') {
            fetchProducts();
        }
    }, [view]);

    const handlePriceChange = (e) => {
        const newPrice = parseFloat(e.target.value);
        if (!isNaN(newPrice)) {
            setPrice(newPrice);
            calculateTotal(newPrice, qty);
        }
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity)) {
            setQty(newQuantity);
            calculateTotal(price, newQuantity);
        }
    };

    const calculateTotal = (price, qty) => {
        const newTotal = price * qty;
        setSum(newTotal);
    };

    const handleAddProduct = async () => {
        const newProduct = { name, price, qty, sum };
        try {
            const response = await fetch('http://localhost:8080/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add product');
            }
            const data = await response.json();
            console.log(data.message);
            setProducts([...products, { ...newProduct, _id: data.id }]);
            setTotal(total + newProduct.sum);
            handleResetForm();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleUpdateProduct = async (id, updatedProduct) => {
        try {
            const response = await fetch(`http://localhost:8080/update-product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update product');
            }
            const data = await response.json();
            console.log(data.message);
            const updatedProducts = products.map(product =>
                product._id === id ? { ...product, ...updatedProduct } : product
            );
            setProducts(updatedProducts);
            setEditProduct(null);
            handleResetForm();
            setLocalView('list'); // Change local view to list
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
            const newTotal = data.reduce((acc, product) => acc + product.sum, 0);
            setTotal(newTotal);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleResetForm = () => {
        setName('');
        setQty(0);
        setPrice(0);
        setSum(0);
    };

    const handleDeleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/delete-product/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            const updatedProducts = products.filter(product => product._id !== id);
            setProducts(updatedProducts);
            const newTotal = updatedProducts.reduce((acc, product) => acc + product.sum, 0);
            setTotal(newTotal);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditClick = (product) => {
        setEditProduct(product);
        setName(product.name);
        setPrice(product.price);
        setQty(product.qty);
        setSum(product.sum);
        setLocalView('add'); // Switch to 'add' view
    };

    const handleUpdateProductForm = async () => {
        const updatedProduct = { name, price, qty, sum };
        await handleUpdateProduct(editProduct._id, updatedProduct);
    };

    const renderAddProductView = () => (
        <div className="container-fluid bg-2 text-center add-product-page">
            <h1>{editProduct ? 'Update Product' : 'New Product'}</h1>
            <br/>
            <div className="row">
                <div className="col-sm-8">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" className="form-control" placeholder="Item Name" value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input type="number" className="form-control" placeholder="Enter Price"
                                        value={price}
                                        onChange={handlePriceChange}
                                    />
                                </td>
                                <td>
                                    <input type="number" className="form-control" placeholder="Enter Qty"
                                        value={qty}
                                        onChange={handleQuantityChange}
                                    />
                                </td>
                                <td>
                                    <input type="text" value={sum} className="form-control" placeholder="Enter Total" disabled />
                                </td>
                                <td>
                                    {editProduct ? (
                                        <button className="btn btn-warning add-button" type="button" onClick={handleUpdateProductForm}>UPDATE</button>
                                    ) : (
                                        <button className="btn btn-success add-button" type="button" onClick={handleAddProduct}>ADD</button>
                                    )}
                                    <button className="btn btn-danger ml-2" type="button" onClick={handleResetForm}>RESET</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="center-btn-container">
                <button onClick={() => setLocalView('list')} className="btn btn-secondary">View Products</button>
                <span 
                  className="btn btn-secondary ml-2 back-button" 
                  onClick={() => setView('productDetails')} // Navigate to ProductDetails
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </span>
            </div>
        </div>
    );
    
    const renderProductListView = () => (
        <div className="container-fluid bg-2 text-center product-list-page">
            <h1>Product Catalog</h1>
            <br />
            <div className="grid-container">
                <div className="grid-item grid-header">Item Name</div>
                <div className="grid-item grid-header">Price</div>
                <div className="grid-item grid-header">Quantity</div>
                <div className="grid-item grid-header">Amount</div>
                <div className="grid-item grid-header">Availability</div>
                <div className="grid-item grid-header">Actions</div>
                {products.map((product) => (
                    <React.Fragment key={product._id}>
                        <div className="grid-item">{product.name}</div>
                        <div className="grid-item">{product.price}</div>
                        <div className="grid-item">{product.qty}</div>
                        <div className="grid-item">{product.sum}</div>
                        <div className="grid-item">
                            {product.qty > 1 ? 'Stock Available' : product.qty === 1 ? 'Last Item' : 'Stock Out'}
                        </div>
                        <div className="grid-item">
                            <button className="btn btn-warning mr-2 edit-button"
                                onClick={() => handleEditClick(product)}
                            >
                                Edit
                            </button>
                            <button className="btn btn-danger"
                                onClick={() => handleDeleteProduct(product._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div className="col-sm-4">
                <div className="form-group" align="left">
                    <h3>Total</h3>
                    <input type="text" className="form-control" placeholder="Total" disabled value={total} />
                </div>
            </div>
            <div className="center-btn-container">
                <button onClick={() => setLocalView('add')} className="btn btn-primary mt-4">Go to Dashboard</button>
            </div>
        </div>
    );
    

    const renderProductDetailsView = () => (
        <ProductDetails setView={setView} />
    );

    return (
        <div>
            {view === 'add' ? (
                renderAddProductView()
            ) : view === 'list' ? (
                renderProductListView()
            ) : view === 'product-details' ? (
                renderProductDetailsView()
            ) : null}
        </div>
    );
}

export default Inventory;
