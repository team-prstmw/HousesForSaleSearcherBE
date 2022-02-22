const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  house: { type: Schema.Types.ObjectId, ref: 'House', required: true },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
