const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  house: { type: Schema.Types.ObjectId, ref: 'House' },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
