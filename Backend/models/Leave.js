const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  leaveType: String,
  startDate: Date,
  endDate: Date,
  reason: String,
  status: {
    type: String,
    default: "pending"
  }
});

module.exports = mongoose.model("Leave", leaveSchema);