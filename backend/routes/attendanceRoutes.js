const express = require("express");
const {
  takeAttendance,
  getAttendanceReport,
  getUserAttendance,
} = require("../controllers/attendanceController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/take", verifyToken, takeAttendance);
router.post("/report", verifyToken, getAttendanceReport);
router.post("/user", verifyToken, getUserAttendance);

module.exports = router;
