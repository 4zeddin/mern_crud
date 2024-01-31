const Mongoose = require("mongoose");
const todo = require("../models/todoModel");

// Create operation
const createItem = async (req, res) => {
  try {
    const newTodo = await todo.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get items list
const getAllItems = async (req, res) => {
  try {
    const todos = await todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update operation
const updateItem = async (req, res) => {
  const { id } = req.params;
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Todo not found" });
  }
  try {
    const updatedItem = await todo.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete operation
const deleteItem = async (req, res) => {
  const { id } = req.params;
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Todo not found" });
  }
  try {
    const deletedItem = await todo.findOneAndDelete({ _id: id });
    if (!deletedItem) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
};
