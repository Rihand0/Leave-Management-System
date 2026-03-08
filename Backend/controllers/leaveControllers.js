const Leave = require("../models/Leave");
const User = require("../models/user");

// Employee applies for leave
exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const leave = new Leave({
      employeeId: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason
    });

    await leave.save();

    res.json({ message: "Leave applied successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Employee views their own leaves
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user.id });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Employer views all leaves
exports.getAllLeaves = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const leaves = await Leave.find().populate("employeeId", "name email");
    res.json(leaves);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Employer approves leave
exports.approveLeave = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = "approved";
    await leave.save();

    res.json({ message: "Leave approved" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Employer rejects leave
exports.rejectLeave = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = "rejected";
    await leave.save();

    res.json({ message: "Leave rejected" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};