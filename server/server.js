// const http = require('http');
// const { MongoClient } = require('mongodb');

// // MongoDB connection
// const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// let db;

// async function connectToDB() {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//         db = client.db('inventory').collection('products');
//     } catch (err) {
//         console.error('Error connecting to MongoDB:', err);
//     }
// }

// // Function to handle incoming requests
// const requestListener = async (req, res) => {
//     // CORS Headers
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     if (req.method === 'POST' && req.url === '/add-product') {
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', async () => {
//             const product = JSON.parse(body);
//             await db.insertOne(product);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ message: 'Product added successfully!' }));
//         });
//     } else if (req.method === 'GET' && req.url === '/products') {
//         const products = await db.find().toArray();
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify(products));
//     } else {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Not Found' }));
//     }
// };

// // Create the HTTP server
// const server = http.createServer(requestListener);

// // Start the server and connect to the database
// const PORT = 5000;
// server.listen(PORT, async () => {
//     await connectToDB();
//     console.log(`Server is running on port ${PORT}`);
// });
// aloooooooo
// const http = require('http');
// const { MongoClient } = require('mongodb');

// // MongoDB connection
// const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// let db;

// async function connectToDB() {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//         db = client.db('inventory').collection('products');
//     } catch (err) {
//         console.error('Error connecting to MongoDB:', err);
//         process.exit(1); // Exit if there's an error connecting to the database
//     }
// }

// const requestListener = async (req, res) => {
//     // CORS Headers
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     // Handle preflight requests for CORS
//     if (req.method === 'OPTIONS') {
//         res.writeHead(204);
//         res.end();
//         return;
//     }

//     if (req.method === 'POST' && req.url === '/add-product') {
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', async () => {
//             try {
//                 const product = JSON.parse(body);
//                 await db.insertOne(product);
//                 res.writeHead(200, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Product added successfully!' }));
//             } catch (err) {
//                 console.error('Error adding product to DB:', err);
//                 res.writeHead(500, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Failed to add product' }));
//             }
//         });
//     } else if (req.method === 'GET' && req.url === '/products') {
//         try {
//             const products = await db.find().toArray();
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify(products));
//         } catch (err) {
//             console.error('Error fetching products:', err);
//             res.writeHead(500, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ message: 'Failed to fetch products' }));
//         }
//     } else {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Not Found' }));
//     }
// };

// // Create the HTTP server
// const server = http.createServer(requestListener);

// // Start the server and connect to the database
// const PORT = 5001;
// server.listen(PORT, async () => {
//     await connectToDB();
//     console.log(`Server is running on port ${PORT}`);
// });

// const http = require('http');
// const { MongoClient, ObjectId } = require('mongodb');

// // MongoDB connection
// const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// let db;

// async function connectToDB() {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//         db = client.db('inventory').collection('products');
//     } catch (err) {
//         console.error('Error connecting to MongoDB:', err);
//         process.exit(1); // Exit if there's an error connecting to the database
//     }
// }

// const requestListener = async (req, res) => {
//     // CORS Headers
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     // Handle preflight requests for CORS
//     if (req.method === 'OPTIONS') {
//         res.writeHead(204);
//         res.end();
//         return;
//     }

//     if (req.method === 'POST' && req.url === '/add-product') {
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', async () => {
//             try {
//                 const product = JSON.parse(body);

//                 // Validate product
//                 if (!product.name || !product.price || !product.qty) {
//                     res.writeHead(400, { 'Content-Type': 'application/json' });
//                     return res.end(JSON.stringify({ message: 'Missing product information' }));
//                 }

//                 // Insert product into DB
//                 await db.insertOne(product);
//                 res.writeHead(200, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Product added successfully!' }));
//             } catch (err) {
//                 console.error('Error adding product to DB:', err);
//                 res.writeHead(500, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Failed to add product' }));
//             }
//         });
//     } else if (req.method === 'GET' && req.url === '/products') {
//         try {
//             const products = await db.find().toArray();
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify(products));
//         } catch (err) {
//             console.error('Error fetching products:', err);
//             res.writeHead(500, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ message: 'Failed to fetch products' }));
//         }
//     } else if (req.method === 'DELETE' && req.url.startsWith('/delete-product/')) {
//         const productId = req.url.split('/').pop();
//         try {
//             const result = await db.deleteOne({ _id: new ObjectId(productId) });
//             if (result.deletedCount === 1) {
//                 res.writeHead(200, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Product deleted successfully!' }));
//             } else {
//                 res.writeHead(404, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Product not found' }));
//             }
//         } catch (err) {
//             console.error('Error deleting product from DB:', err);
//             res.writeHead(500, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ message: 'Failed to delete product' }));
//         }
//     } else {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Not Found' }));
//     }
// };

// // Create the HTTP server
// const server = http.createServer(requestListener);

// // Start the server and connect to the database
// const PORT = 5001;
// server.listen(PORT, async () => {
//     await connectToDB();
//     console.log(`Server is running on port ${PORT}`);
// });


// const requestListener = async (req, res) => {
//   // CORS Headers
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   // Handle preflight requests for CORS
//   if (req.method === 'OPTIONS') {
//       res.writeHead(204);
//       res.end();
//       return;
//   }

//   if (req.method === 'POST' && req.url === '/add-product') {
//       let body = '';
//       req.on('data', chunk => {
//           body += chunk.toString();
//       });
//       req.on('end', async () => {
//           try {
//               const product = JSON.parse(body);
//               await db.insertOne(product);
//               res.writeHead(200, { 'Content-Type': 'application/json' });
//               res.end(JSON.stringify({ message: 'Product added successfully!' }));
//           } catch (err) {
//               console.error('Error adding product to DB:', err);
//               res.writeHead(500, { 'Content-Type': 'application/json' });
//               res.end(JSON.stringify({ message: 'Failed to add product' }));
//           }
//       });
//   } else if (req.method === 'GET' && req.url === '/products') {
//       try {
//           const products = await db.find().toArray();
//           res.writeHead(200, { 'Content-Type': 'application/json' });
//           res.end(JSON.stringify(products));
//       } catch (err) {
//           console.error('Error fetching products:', err);
//           res.writeHead(500, { 'Content-Type': 'application/json' });
//           res.end(JSON.stringify({ message: 'Failed to fetch products' }));
//       }
//   } else if (req.method === 'DELETE' && req.url.startsWith('/delete-product/')) {
//       const productId = req.url.split('/').pop();
//       try {
//           await db.deleteOne({ _id: new MongoClient.ObjectId(productId) });
//           res.writeHead(200, { 'Content-Type': 'application/json' });
//           res.end(JSON.stringify({ message: 'Product deleted successfully!' }));
//       } catch (err) {
//           console.error('Error deleting product from DB:', err);
//           res.writeHead(500, { 'Content-Type': 'application/json' });
//           res.end(JSON.stringify({ message: 'Failed to delete product' }));
//       }
//   } else {
//       res.writeHead(404, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ message: 'Not Found' }));
//   }
// };
// const http = require('http');
// const { MongoClient, ObjectId } = require('mongodb');

// // MongoDB connection
// const uri = 'mongodb://localhost:27017';
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// let db;

// async function connectToDB() {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//         db = client.db('inventory').collection('products');
//     } catch (err) {
//         console.error('Error connecting to MongoDB:', err);
//         process.exit(1);
//     }
// }

// const requestListener = async (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     if (req.method === 'OPTIONS') {
//         res.writeHead(204);
//         res.end();
//         return;
//     }

//     if (req.method === 'POST' && req.url === '/add-product') {
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', async () => {
//             try {
//                 const product = JSON.parse(body);
//                 const result = await db.insertOne(product);
//                 res.writeHead(200, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Product added successfully!', id: result.insertedId }));
//             } catch (err) {
//                 console.error('Error adding product to DB:', err);
//                 res.writeHead(500, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Failed to add product' }));
//             }
//         });
//     } else if (req.method === 'GET' && req.url === '/products') {
//         try {
//             const products = await db.find().toArray();
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify(products));
//         } catch (err) {
//             console.error('Error fetching products:', err);
//             res.writeHead(500, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ message: 'Failed to fetch products' }));
//         }
//     } else if (req.method === 'DELETE' && req.url.startsWith('/delete-product/')) {
//         const id = req.url.split('/').pop();
//         try {
//             const result = await db.deleteOne({ _id: new ObjectId(id) });
//             if (result.deletedCount === 1) {
//                 res.writeHead(200, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Product deleted successfully' }));
//             } else {
//                 res.writeHead(404, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Product not found' }));
//             }
//         } catch (err) {
//             console.error('Error deleting product:', err);
//             res.writeHead(500, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ message: 'Failed to delete product' }));
//         }
//     } else {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Not Found' }));
//     }
// };

// const server = http.createServer(requestListener);

// const PORT = 5002; // Change the port number to 5002
// server.listen(PORT, async () => {
//     await connectToDB();
//     console.log(`Server is running on port ${PORT}`);
// });



//original code
// const http = require('http');
// const { MongoClient, ObjectId } = require('mongodb');

// // MongoDB connection
// const uri = 'mongodb://localhost:27017';
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// let db;

// async function connectToDB() {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//         db = client.db('object').collection('pro');
//     } catch (err) {
//         console.error('Error connecting to MongoDB:', err);
//         process.exit(1);
//     }
// }

// const requestListener = async (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     if (req.method === 'OPTIONS') {
//         res.writeHead(204);
//         res.end();
//         return;
//     }

//     if (req.method === 'POST' && req.url === '/add-product') {
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', async () => {
//             try {
//                 const product = JSON.parse(body);
//                 const result = await db.insertOne(product);
//                 res.writeHead(200, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Product added successfully!', id: result.insertedId }));
//             } catch (err) {
//                 console.error('Error adding product to DB:', err);
//                 res.writeHead(500, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Failed to add product' }));
//             }
//         });
//     } else if (req.method === 'GET' && req.url === '/products') {
//         try {
//             const products = await db.find().toArray();
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify(products));
//         } catch (err) {
//             console.error('Error fetching products:', err);
//             res.writeHead(500, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ message: 'Failed to fetch products' }));
//         }
//     } else if (req.method === 'DELETE' && req.url.startsWith('/delete-product/')) {
//         const id = req.url.split('/').pop();
//         try {
//             const result = await db.deleteOne({ _id: new ObjectId(id) });
//             if (result.deletedCount === 1) {
//                 res.writeHead(200, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Product deleted successfully' }));
//             } else {
//                 res.writeHead(404, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Product not found' }));
//             }
//         } catch (err) {
//             console.error('Error deleting product:', err);
//             res.writeHead(500, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ message: 'Failed to delete product' }));
//         }
//     } else {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Not Found' }));
//     }
// };

// const server = http.createServer(requestListener);

// const PORT = 3000; // Changed the port number to 3000
// server.listen(PORT, async () => {
//     await connectToDB();
//     console.log(`Server is running on port ${PORT}`);
// });
// const http = require('http');
// const { MongoClient, ObjectId } = require('mongodb');
// const cors = require('cors');
// const { URL } = require('url');

// // MongoDB connection
// const uri = 'mongodb://localhost:27017';
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// let db;

// async function connectToDB() {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//         db = client.db('inventory').collection('products');
//     } catch (err) {
//         console.error('Failed to connect to MongoDB', err);
//         process.exit(1);
//     }
// }

// connectToDB();

// const requestHandler = async (req, res) => {
//     const url = new URL(req.url, `http://${req.headers.host}`);

//     if (req.method === 'OPTIONS') {
//         res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 'Access-Control-Allow-Headers': 'Content-Type' });
//         res.end();
//         return;
//     }

//     if (req.method === 'POST' && url.pathname === '/add-product') {
//         let body = '';
//         req.on('data', chunk => body += chunk);
//         req.on('end', async () => {
//             try {
//                 const product = JSON.parse(body);
//                 const result = await db.insertOne(product);
//                 res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
//                 res.end(JSON.stringify({ message: 'Product added successfully', id: result.insertedId }));
//             } catch (error) {
//                 res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
//                 res.end(JSON.stringify({ message: 'Error adding product', error: error.message }));
//             }
//         });
//     } else if (req.method === 'GET' && url.pathname === '/products') {
//         try {
//             const products = await db.find().toArray();
//             res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
//             res.end(JSON.stringify(products));
//         } catch (error) {
//             res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
//             res.end(JSON.stringify({ message: 'Error fetching products', error: error.message }));
//         }
//     } else if (req.method === 'PUT' && url.pathname.startsWith('/update-product/')) {
//         const id = url.pathname.split('/')[2];
//         let body = '';
//         req.on('data', chunk => body += chunk);
//         req.on('end', async () => {
//             try {
//                 const updatedProduct = JSON.parse(body);
//                 const result = await db.updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct });
//                 if (result.matchedCount === 0) {
//                     res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
//                     res.end(JSON.stringify({ message: 'Product not found' }));
//                 } else {
//                     res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
//                     res.end(JSON.stringify({ message: 'Product updated successfully' }));
//                 }
//             } catch (error) {
//                 res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
//                 res.end(JSON.stringify({ message: 'Error updating product', error: error.message }));
//             }
//         });
//     } else if (req.method === 'DELETE' && url.pathname.startsWith('/delete-product/')) {
//         const id = url.pathname.split('/')[2];
//         try {
//             const result = await db.deleteOne({ _id: new ObjectId(id) });
//             if (result.deletedCount === 0) {
//                 res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
//                 res.end(JSON.stringify({ message: 'Product not found' }));
//             } else {
//                 res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
//                 res.end(JSON.stringify({ message: 'Product deleted successfully' }));
//             }
//         } catch (error) {
//             res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
//             res.end(JSON.stringify({ message: 'Error deleting product', error: error.message }));
//         }
//     } else {
//         res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
//         res.end(JSON.stringify({ message: 'Endpoint not found' }));
//     }
// };

// const server = http.createServer(requestHandler);

// const PORT = process.env.PORT || 4000;
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const http = require('http');
const { MongoClient, ObjectId } = require('mongodb');
const { URL } = require('url');

// MongoDB connection
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

async function connectToDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db('hard').collection('learn');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}

connectToDB();

const requestHandler = async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'OPTIONS') {
        res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 'Access-Control-Allow-Headers': 'Content-Type' });
        res.end();
        return;
    }

    if (req.method === 'POST' && url.pathname === '/add-product') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const product = JSON.parse(body);
                const result = await db.insertOne(product);
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ message: 'Product added successfully', id: result.insertedId }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ message: 'Error adding product', error: error.message }));
            }
        });
    } else if (req.method === 'GET' && url.pathname === '/products') {
        try {
            const products = await db.find().toArray();
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify(products));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ message: 'Error fetching products', error: error.message }));
        }
    } else if (req.method === 'PUT' && url.pathname.startsWith('/update-product/')) {
        const id = url.pathname.split('/')[2];
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const updatedProduct = JSON.parse(body);
                const result = await db.updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct });
                if (result.matchedCount === 0) {
                    res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ message: 'Product not found' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ message: 'Product updated successfully' }));
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ message: 'Error updating product', error: error.message }));
            }
        });
    } else if (req.method === 'DELETE' && url.pathname.startsWith('/delete-product/')) {
        const id = url.pathname.split('/')[2];
        try {
            const result = await db.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ message: 'Product not found' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ message: 'Product deleted successfully' }));
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ message: 'Error deleting product', error: error.message }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ message: 'Endpoint not found' }));
    }
};

const server = http.createServer(requestHandler);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

