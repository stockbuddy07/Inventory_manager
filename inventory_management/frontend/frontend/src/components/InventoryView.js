import React from 'react';
import InventoryTable from './InventoryTable';

function InventoryView() {
  // Sample inventory data - replace with your actual data source
  const inventoryItems = [
    { id: 1, name: 'Laptop', quantity: 15, category: 'Electronics', price: 999.99 },
    { id: 2, name: 'Mouse', quantity: 42, category: 'Electronics', price: 19.99 },
    { id: 3, name: 'Keyboard', quantity: 25, category: 'Electronics', price: 49.99 },
    { id: 4, name: 'Monitor', quantity: 18, category: 'Electronics', price: 199.99 },
    { id: 5, name: 'Desk Chair', quantity: 12, category: 'Furniture', price: 149.99 },
    { id: 6, name: 'Notebook', quantity: 75, category: 'Office Supplies', price: 4.99 },
    { id: 7, name: 'Pen', quantity: 200, category: 'Office Supplies', price: 1.99 },
    { id: 8, name: 'Stapler', quantity: 30, category: 'Office Supplies', price: 8.99 },
    { id: 9, name: 'Paper', quantity: 50, category: 'Office Supplies', price: 12.99 },
    { id: 10, name: 'Folder', quantity: 60, category: 'Office Supplies', price: 2.99 },
    { id: 11, name: 'Printer', quantity: 8, category: 'Electronics', price: 299.99 },
    { id: 12, name: 'Scanner', quantity: 5, category: 'Electronics', price: 199.99 },
  ];

  return (
    <div className="inventory-view container mt-4">
      <h2 className="mb-4">Inventory Management</h2>
      <div className="table-responsive">
        <InventoryTable items={inventoryItems} />
      </div>
    </div>
  );
}

export default InventoryView;
