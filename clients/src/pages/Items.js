import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Items() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, price: 0, supplier: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/items').then(res => setItems(res.data));
  }, []);

  const addItem = () => {
    axios.post('http://localhost:5000/api/items', newItem).then(res => {
      setItems([...items, res.data]);
      setNewItem({ name: '', quantity: 0, price: 0, supplier: '' });
    });
  };

  return (
    <div>
      <h2>Items</h2>
      <input placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
      <input placeholder="Quantity" type="number" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: +e.target.value })} />
      <input placeholder="Price" type="number" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: +e.target.value })} />
      <input placeholder="Supplier" value={newItem.supplier} onChange={e => setNewItem({ ...newItem, supplier: e.target.value })} />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map(i => (
          <li key={i._id}>{i.name} - {i.quantity} units - ${i.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default Items;