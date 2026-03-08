const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave
} = require("../controllers/leaveControllers");

// Employee
router.post("/apply", auth, applyLeave);
router.get("/my-leaves", auth, getMyLeaves);

// Employer
router.get("/all", auth, getAllLeaves);
router.put("/approve/:id", auth, approveLeave);
router.put("/reject/:id", auth, rejectLeave);

module.exports = router;