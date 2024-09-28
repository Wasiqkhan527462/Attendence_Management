const Attendance = require("../models/Attendance");

exports.takeAttendance = async (req, res) => {
  const { date, attendance } = req.body;
  await Attendance.deleteMany({ date });
  await Attendance.insertMany(
    attendance.map((att) => ({ userId: att.userId, date, status: att.status }))
  );
  res.status(200).json({ message: "Attendance recorded successfully" });
};

exports.getAttendanceReport = async (req, res) => {
  const { userId, startDate, endDate } = req.body;
  try {
    if (!userId || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const report = await Attendance.find({
      userId,
      date: { $gte: start, $lte: end },
    });
    if (report.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }
    res
      .status(200)
      .json({ message: "Report generated successfully", data: report });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserAttendance = async (req, res) => {
  const { userId, startDate, endDate } = req.body;
  try {
    if (!userId || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const records = await Attendance.find({
      userId,
      date: { $gte: start, $lte: end },
    });
    if (records.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }
    res
      .status(200)
      .json({ message: "Records retrieved successfully", data: records });
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
