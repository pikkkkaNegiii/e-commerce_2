import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    // Remove existing products and users
    await Product.deleteMany({});
    await User.deleteMany({});

    // Insert new products and users
    const createdProducts = await Product.insertMany(data.products);
    const createdUsers = await User.insertMany(data.users);

    res.send({ createdProducts, createdUsers });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

export default seedRouter;
