const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = Schema(
  {
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    house: { type: Schema.Types.ObjectId, ref: 'House', required: true },
    price: { type: Number, min: [0, 'Must be a positive number.'], required: true },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
