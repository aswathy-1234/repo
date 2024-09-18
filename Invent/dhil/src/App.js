
import React, { useState } from 'react';
import Inventory from './components/inventory';
import ProductDetails from './components/ProductDetails';

function Apps() {
    const [view, setView] = useState('productDetails'); // Default view

    return (
        <div>
            {view === 'productDetails' ? (
                <ProductDetails setView={setView} />
            ) : (
                <Inventory setView={setView} />
            )}
        </div>
    );
}

export default Apps;


