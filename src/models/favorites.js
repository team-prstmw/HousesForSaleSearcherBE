const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  favorites: [
    {
      id: Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model('Favorites', userSchema);
