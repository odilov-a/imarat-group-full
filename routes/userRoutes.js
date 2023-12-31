const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes


// Protected routes (requires authentication)
router.use(authMiddleware.authenticateToken);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
