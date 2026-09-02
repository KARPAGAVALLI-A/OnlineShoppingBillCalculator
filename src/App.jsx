import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);

  const addItem = (e) => {
    e.preventDefault();
    if (!name || price <= 0 || quantity <= 0) return;
    const newItem = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };

    setItems([...items, newItem]);
    setName('');
    setPrice('');
    setQuantity(1);
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = subtotal * (discount / 100);
    const taxAmount = (subtotal - discountAmount) * 0.18; // 18% Tax Rate
    return (subtotal - discountAmount + taxAmount).toFixed(2);
  };

  return (
    <div className="app-container">
      <h1>Online Shopping Bill Calculator</h1>
      <div className="calculator-layout">
        <form onSubmit={addItem} className="item-form">
          <h3>Add Purchased Item</h3>
          <input type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <br></br>
          <input type="number" step="0.01" placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <br></br>
          <input type="number" min="1" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          <br></br>
          <button type="submit">Add to Invoice</button>
        </form>

        <div className="billing-summary">
          <h3>Current Invoice</h3>
          {items.length === 0 ? <p>No items added yet.</p> : (
            <table>
              <thead>
                <tr><th>Item</th><th>Price</th><th>Qty</th><th>Total</th><th>Action</th></tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td><button onClick={() => deleteItem(item.id)} className="delete-btn">X</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="global-controls">
            <label>Discount Rate (%): </label>
            <input type="number" min="0" max="100" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} />
          </div>

          <div className="total-breakdown">
            <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
            <p>Tax (18% GST/VAT): ${( (calculateSubtotal() - (calculateSubtotal() * (discount / 100))) * 0.18 ).toFixed(2)}</p>
            <h2>Grand Total: ${calculateTotal()}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
