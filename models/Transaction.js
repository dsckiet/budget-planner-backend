const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  wallet: { type: String, enum: ["offline", "online"] },
  created_at: { type: Date, default: Date.now },
  amount: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
