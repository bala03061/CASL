// backend/controllers/itemController.js
const Item = require('../models/item');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createItem = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newItem = new Item({ name, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating item' });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { name, description }, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item' });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting item' });
  }
};
