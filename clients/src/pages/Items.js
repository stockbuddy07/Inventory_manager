import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Items() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, price: 0, supplier: '' });
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get('http://localhost:5000/api/items')
      .then(res => setItems(res.data))
      .catch(err => console.error("Error fetching items", err));
  };

  const addItem = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items');
      const existingItems = res.data;

      // Ensure quantity is treated as a number and convert to grams (kg to grams)
      const quantityInGrams = Number(newItem.quantity) * 1000;

      // Check if the item already exists (ignoring case)
      const match = existingItems.find(item =>
        item.name.toLowerCase() === newItem.name.toLowerCase()
      );

      if (match) {
        // If item exists, update the quantity (add the new quantity in grams to the existing one)
        const updatedItem = {
          ...match,
          quantity: match.quantity + quantityInGrams, // Add quantities in grams
        };

        // Make PUT request to update item
        await axios.put(`http://localhost:5000/api/items/${match._id}`, updatedItem);
        setMessage("Item already exists. Quantity updated.");
      } else {
        // If item does not exist, create a new one with quantity in grams
        const itemToAdd = {
          ...newItem,
          quantity: quantityInGrams,  // Store quantity in grams
        };
        await axios.post('http://localhost:5000/api/items', itemToAdd);
        setMessage("New item added.");
      }

      // Reset the input fields after adding or updating the item
      setNewItem({ name: '', quantity: 0, price: 0, supplier: '' });

      // Refresh the items list
      fetchItems();
      
      // Open the success snackbar
      setOpenSnackbar(true);
    } catch (error) {
      console.error("There was an error adding the item!", error);
      setMessage("Error adding item.");
      setOpenSnackbar(true);
    }
  };

  const updateQuantity = async (item, deltaKg) => {
    const currentQuantity = Number(item.quantity); // Ensure quantity is treated as a number
    if (isNaN(currentQuantity)) {
      console.error("Invalid quantity:", item.quantity);
      return;
    }

    // Convert the delta from kg to grams
    const newQuantity = currentQuantity + (deltaKg * 1000);

    if (newQuantity < 0) return;

    try {
      const updatedItem = {
        ...item,
        quantity: newQuantity,  // Update quantity in grams
      };
      await axios.put(`http://localhost:5000/api/items/${item._id}`, updatedItem);
      setMessage("Quantity updated.");
      setOpenSnackbar(true);
      fetchItems();
    } catch (error) {
      console.error("Error updating quantity", error);
      setMessage("Error updating quantity.");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Inventory Management
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'nowrap' }}>
          <TextField
            label="Item Name"
            variant="outlined"
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            sx={{ minWidth: 150 }}
          />
          <TextField
            label="Quantity (kg)"
            type="number"
            variant="outlined"
            value={newItem.quantity}
            onChange={e => setNewItem({ ...newItem, quantity: +e.target.value })}
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            value={newItem.price}
            onChange={e => setNewItem({ ...newItem, price: +e.target.value })}
            sx={{ minWidth: 100 }}
          />
          <TextField
            label="Supplier"
            variant="outlined"
            value={newItem.supplier}
            onChange={e => setNewItem({ ...newItem, supplier: e.target.value })}
            sx={{ minWidth: 150 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addItem}
            sx={{ minWidth: 100 }}
          >
            Add Item
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Quantity (kg)</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(i => (
                <TableRow key={i._id}>
                  <TableCell>{i.name}</TableCell>
                  <TableCell>{(Number(i.quantity) / 1000).toFixed(2)}</TableCell>  {/* Convert back to kg for display */}
                  <TableCell>${i.price}</TableCell>
                  <TableCell>{i.supplier}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => updateQuantity(i, -1)} color="error">
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={() => updateQuantity(i, 1)} color="success">
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={message.includes("Error") ? "error" : "success"}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default Items;
