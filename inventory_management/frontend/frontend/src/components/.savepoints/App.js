import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddItemForm from "./components/AddItemForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import InventoryView from "./components/InventoryView";
import ReportsView from "./components/ReportsView";
import SettingsView from "./components/SettingsView";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
    console.log('Item added:', item);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<InventoryView />} />
            <Route path="/add-item" element={<AddItemForm onAddItem={addItem} />} />
            <Route path="/reports" element={<ReportsView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
