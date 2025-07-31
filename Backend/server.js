require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const expensesRoutes = require('./routes/expenses');
const budgetRoutes = require('./routes/budgets');

const app = express();

// ✅ Middleware first
app.use(express.json());

// ✅ Logger middleware (optional)
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// ✅ Routes
app.use('/api/expenses', expensesRoutes);
app.use('/api/budgets', budgetRoutes); // move this after middleware

// ✅ DB + Server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('✅ Connected to DB and listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error('❌ DB connection error:', error.message);
  });
