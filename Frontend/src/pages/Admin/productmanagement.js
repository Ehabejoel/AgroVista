import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, X, Search } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="min-w-full">
      <thead>
        <tr className="bg-green-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Name</th>
          <th className="py-3 px-6 text-left">Category</th>
          <th className="py-3 px-6 text-left">Price</th>
          <th className="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm">
        {products.map((product) => (
          <tr key={product.id} className="border-b border-gray-200 hover:bg-green-100">
            <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{product.name}</td>
            <td className="py-3 px-6 text-left">
              <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                {product.category}
              </span>
            </td>
            <td className="py-3 px-6 text-left">Fcfa{product.price.toFixed()}</td>
            <td className="py-3 px-6 text-center">
              <div className="flex item-center justify-center">
                <button onClick={() => onEdit(product)} className="text-purple-500 hover:text-purple-600 mx-2">
                  <Edit size={18} />
                </button>
                <button onClick={() => onDelete(product.id)} className="text-red-500 hover:text-red-600 mx-2">
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ProductForm = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && category && price && image) {
      onSubmit({ name, category, price: parseFloat(price), image });
      onClose();
    } else {
      alert('Please fill all fields and upload an image');
    }
  };

  return (
    <div className="fixed inset-0 bg-green-100 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add Product</h2>
          <button onClick={onClose} className="text-green-600 hover:text-green-800">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="vegetables">Vegetables</option>
              <option value="livestock">Livestock</option>
              <option value="roots">Roots</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              accept="image/*"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Apple', category: 'fruits', price: 1.99 },
    { id: 2, name: 'Carrot', category: 'vegetables', price: 0.99 },
    { id: 3, name: 'Wheat', category: 'grains', price: 2.49 },
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [products, searchTerm]);

  const handleAddProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: Date.now() };
    setProducts([...products, productWithId]);
  };

  const handleEditProduct = (product) => {
    // Implement edit functionality
    console.log('Edit product:', product);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="container w-[full] p-6  min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
          >
            <Plus size={20} className="mr-2" />
            Add Product
          </button>
        </div>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <ProductTable
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
      {isFormOpen && (
        <ProductForm
          onSubmit={handleAddProduct}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductManagement;