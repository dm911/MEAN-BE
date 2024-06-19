const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/user.model');
const Transaction = require('./src/models/transaction.model');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log('Connected to MongoDB');

  // Clear existing data
  await User.deleteMany({});
  await Transaction.deleteMany({});

  // Seed users
  const adminPassword = await bcrypt.hash('adminpassword', 10);
  const userPassword = await bcrypt.hash('userpassword', 10);

  const adminUser = new User({
    username: 'admin',
    password: adminPassword,
    role: 'ADMIN',
  });

  const regularUser = new User({
    username: 'user',
    password: userPassword,
    role: 'USER',
  });

  await adminUser.save();
  await regularUser.save();

  // Seed transactions
  const transactions = [
    {
      amount: 100,
      description: 'Grocery Shopping',
      date: new Date(),
      category: 'Food',
      account: 'Checking',
      type: 'Expense',
      user_id: adminUser._id,
    },
    {
      amount: 50,
      description: 'Electricity Bill',
      date: new Date(),
      category: 'Utilities',
      account: 'Checking',
      type: 'Expense',
      user_id: regularUser._id,
    },
    // Add more transactions as needed
  ];

  await Transaction.insertMany(transactions);

  console.log('Data seeded successfully');
  mongoose.connection.close();
});