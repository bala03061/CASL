// backend/routes/itemRoutes.js
const express = require('express');
const {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');
const roleMiddleware = require('../middleware/roleMiddleware'); // Import the middleware

const router = express.Router();

// Route to get all items (accessible to all users)
router.get('/', getAllItems);

// Route to create an item (accessible to both admin and visitor)
router.post('/', roleMiddleware(['admin', 'visitor']), createItem);

// Route to update an item (accessible only to admin)
router.put('/:id', roleMiddleware(['admin']), updateItem);

// Route to delete an item (accessible only to admin)
router.delete('/:id', roleMiddleware(['admin']), deleteItem);

module.exports = router;
