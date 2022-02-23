const mongoose = require('mongoose')

const housesSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
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
        district: {
            type:String,
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
            type: String,
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
    meta: {
        houseId: {
            type: mongoose.Schema.Types.ObjectId,
            default: new mongoose.Types.ObjectId
        },
        created: {
            type: Date,
            default: Date.now(),
            immutable: true
        },
        modified: {
            type: Date,
        },
        viewsCounter: {
            type: Number,
            default: 0
        },
        favoritesCounter: {
            type: Number,
            default: 0
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
    }
})

module.exports = mongoose.model('Houses', housesSchema)