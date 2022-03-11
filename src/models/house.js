const mongoose = require('mongoose');

const { Schema } = mongoose;

const HOUSE_ACTIVE = require('../constants/houses');

const HouseSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    descriptionField: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    region: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
    },
    street: {
      type: String,
      required: true,
    },
    houseNr: {
      type: String,
      required: true,
    },
    flatNr: {
      type: String,
      default: '',
    },
    propertyType: {
      type: String,
      required: true,
    },
    roomsNumber: {
      type: Number,
      required: true,
    },
    bathroomNumber: {
      type: Number,
      required: true,
    },
    floorsInBuilding: {
      type: Number,
      required: true,
    },
    heating: {
      type: String,
      lowercase: true,
    },
    otherFeatures: {
      type: Array,
      default: [],
    },
    yearBuilt: {
      type: Number,
    },
    area: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
    },
    houseStatus: {
      type: Number,
      default: HOUSE_ACTIVE,
    },
    viewsCounter: {
      type: Number,
      default: 0,
    },
    favoritesCounter: {
      type: Number,
      default: 0,
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Houses', HouseSchema);
