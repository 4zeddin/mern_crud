const Todos = require("../dbTodos")

// Create operation
const createItem = async (req, res) => {
  try {
    const newItem = await T2odos.create(req.body);
    res.status(201).send(newItem);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get items list
const getAllItems = async (req, res) => {
  try {
    const items = await Todos.find().sort({createdAt:-1});
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update operation
const updateItem = async (req, res) => {
  try {
    const updatedItem = await Todos.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).send({ error: 'Item not found' });
    }
    res.status(200).send(updatedItem);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Delete operation
const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Todos.findByIdAndRemove(req.params.id);
    if (!deletedItem) {
      return res.status(404).send({ error: 'Item not found' });
    }
    res.status(200).send(deletedItem);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
};