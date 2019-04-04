const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  wallet: [String], // ["Offline","Online"]
  createdAt: {
    type: Date,
    default: () => {
      return new Date();
    }
  },
  amount: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = Transaction = mongoose.model("Transaction", TransactionSchema);
