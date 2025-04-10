const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/item.routes');

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());  // Fix here: use express.json()

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use('/api/items', itemRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
