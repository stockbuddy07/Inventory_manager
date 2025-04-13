import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/suppliers').then(res => setSuppliers(res.data));
  }, []);

  const addSupplier = () => {
    axios.post('http://localhost:5000/api/suppliers', newSupplier).then(res => {
      setSuppliers([...suppliers, res.data]);
      setNewSupplier({ name: '', contact: '' });
    });
  };

  return (
    <div>
      <h2>Suppliers</h2>
      <input placeholder="Name" value={newSupplier.name} onChange={e => setNewSupplier({ ...newSupplier, name: e.target.value })} />
      <input placeholder="Contact" value={newSupplier.contact} onChange={e => setNewSupplier({ ...newSupplier, contact: e.target.value })} />
      <button onClick={addSupplier}>Add</button>
      <ul>
        {suppliers.map(s => (
          <li key={s._id}>{s.name} - {s.contact}</li>
        ))}
      </ul>
    </div>
  );
}

export default Suppliers;
