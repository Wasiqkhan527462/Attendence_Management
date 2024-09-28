const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
