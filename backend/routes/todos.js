const {
  deleteItem,
  updateItem,
  createItem,
  getAllItems,
} = require("../controllers/todoController");
express = require("express");
const router = express.Router();

router.get("/", getAllItems);
router.post("/", createItem);
router.patch("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
