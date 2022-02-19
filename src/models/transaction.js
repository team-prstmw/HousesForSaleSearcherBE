const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  house: { type: Schema.Types.ObjectId, ref: 'House' },
  timestamp: { type: Date, default: Date.now },
  price: Number,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
