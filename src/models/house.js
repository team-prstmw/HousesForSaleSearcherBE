const mongoose = require('mongoose');
const { Schema } = mongoose;

const HouseSchema = new Schema(
  {
    houseId: {
      type: Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    houseStatus: {
      type: Number,
      default: 1,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    address: {
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
    },
    houseType: {
      type: String,
      required: true,
    },
    attributes: {
      nrOfRooms: {
        type: Number,
        required: true,
      },
      nrOfBathrooms: {
        type: Number,
        required: true,
      },
      floors: {
        type: Number,
        required: true,
      },
      heating: {
        type: String,
        required: true,
        lowercase: true,
      },
    },
    otherFeatures: {
      type: Array,
      default: [],
    },
    constructionDate: {
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
    meta: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Houses', HouseSchema);
