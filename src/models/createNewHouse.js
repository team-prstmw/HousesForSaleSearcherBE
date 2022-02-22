const mongoose = require('mongoose')

const housesSchema = new mongoose.Schema({
    owner: {},
    address:{
        country:{
            type: String,
            required: true
        },
        region:{
            type: String
        },
        town:{
            type: String,
            required: true
        },
        street:{
            type: String,
            required: true
        },
        houseNr: {
            type: String,
            required: true
        }
    },
    location: {
        lat:{
            type: Number,
            required: true
        },
        lng:{
            type: Number,
            required: true
        }
    },
    houseType: {
        type: String,
        required: true
    },
    attributes:{
        nrOfRooms:{
            type: Number,
            required: true
        },
        nrOfBathrooms:{
            type: Number,
            required: true
        },
        floors:{
            type: Number,
            required: true
        },
        heating:{
            type: Array[String],
            required: true
        }
    },
    OtherFeatures:{
        type: Array,
        default: []
    },
    constructionDate:{
        type: Number,
    },
    area: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Houses', housesSchema)