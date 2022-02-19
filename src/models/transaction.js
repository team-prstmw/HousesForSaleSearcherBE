const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: mongoose.Types.ObjectId,
    owner: mongoose.Types.ObjectId,
    house: mongoose.Types.ObjectId,
    timestamp: {type: Date, default: Date.now},
    price: Number
  })

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
