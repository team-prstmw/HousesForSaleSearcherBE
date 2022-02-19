const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: mongoose.Types.ObjectId,
  house: mongoose.Types.ObjectId,
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
