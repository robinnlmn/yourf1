const mongoose = require('mongoose')

const legendSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    podiums: {
        type: Number,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    wdc: {
        type: Number,
        required: true
    },
    wdcYears: [
        {
            type: Number,
            required: true
        }
    ],
    team: [
        {
            type: String,
            required: true
        }
    ],
    current: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Legend', legendSchema)