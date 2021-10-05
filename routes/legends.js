require('dotenv').config()
const express = require('express')
const router = express.Router()
const Legend = require('../models/legend')

router.get('/', async function (req, res) {
    try {
        const legends = await Legend.find()
        res.json(legends)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get('/:id', getLegend, (req, res) => {
    res.json(res.legend)
})

router.post('/', async function (req, res) {
    if (req.body.password === process.env.PASSWORD) {
        const legend = new Legend({
            name: req.body.name,
            country: req.body.country,
            points: req.body.points,
            podiums: req.body.podiums,
            wins: req.body.wins,
            wdc: req.body.wdc,
            wdcYears: req.body.wdcYears,
            age: req.body.age,
            team: req.body.team,
            current: req.body.current,
        })
        try {
            const newLegend = await legend.save()
            res.status(201).json(newLegend)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
    else {
        res.json({ message: 'Permissions Denied' })
    }
})

router.patch('/:id', getLegend, async (req, res) => {
    if (req.body.password === process.env.PASSWORD) {
        if (req.body.name != null) {
            res.legend.name = req.body.name
        }
        if (req.body.country != null) {
            res.legend.country = req.body.country
        }
        if (req.body.points != null) {
            res.legend.points = req.body.points
        }
        if (req.body.podiums != null) {
            res.legend.podiums = req.body.podiums
        }
        if (req.body.wins != null) {
            res.legend.wins = req.body.wins
        }
        if (req.body.wdc != null) {
            res.legend.wdc = req.body.wdc
        }
        if (req.body.wdcYears != null) {
            res.legend.wdcYears = req.body.wdcYears
        }
        if (req.body.age != null) {
            res.legend.age = req.body.age
        }
        if (req.body.team != null) {
            res.legend.team = req.body.team
        }
        if (req.body.current != null) {
            res.legend.current = req.body.current
        }
        try {
            const updatedLegend = await res.legend.save()
            res.json(updatedLegend)
        } catch (err) {
            res.status(402).json({ message: err.message })
        }
    }
    else {
        res.json({ message: 'Permissions Denied' })
    }
})

router.delete('/:id', getLegend, async (req, res) => {
    try {
        await res.legend.remove()
        res.json({ message: 'Deleted!' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getLegend(req, res, next) {
    let legend
    try {
        legend = await Legend.findById(req.params.id)
        if (legend == null) {
            return res.status(404).json({ message: 'Cannot find Driver' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    res.legend = legend
    next()
}

module.exports = router