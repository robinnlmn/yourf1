require('dotenv').config()
const express = require('express')
const router = express.Router()
const Driver = require('../models/driver')

router.get('/', async function (req, res) {
    try {
        const drivers = await Driver.find()
        res.json(drivers)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get('/:id', getDriver, (req, res) => {
    res.json(res.driver)
})

router.post('/', async function (req, res) {
    if (req.body.password === process.env.PASSWORD) {
        const driver = new Driver({
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
            const newDriver = await driver.save()
            res.status(201).json(newDriver)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
    else {
        res.json({ message: 'Permissions Denied' })
    }
})

router.patch('/:id', getDriver, async (req, res) => {
    if (req.body.password === process.env.PASSWORD) {
        if (req.body.name != null) {
            res.driver.name = req.body.name
        }
        if (req.body.country != null) {
            res.driver.country = req.body.country
        }
        if (req.body.points != null) {
            res.driver.points = req.body.points
        }
        if (req.body.podiums != null) {
            res.driver.podiums = req.body.podiums
        }
        if (req.body.wins != null) {
            res.driver.wins = req.body.wins
        }
        if (req.body.wdc != null) {
            res.driver.wdc = req.body.wdc
        }
        if (req.body.wdcYears != null) {
            res.driver.wdcYears = req.body.wdcYears
        }
        if (req.body.age != null) {
            res.driver.age = req.body.age
        }
        if (req.body.team != null) {
            res.driver.team = req.body.team
        }
        if (req.body.current != null) {
            res.driver.current = req.body.current
        }
        try {
            const updatedDriver = await res.driver.save()
            res.json(updatedDriver)
        } catch (err) {
            res.status(402).json({ message: err.message })
        }
    }
    else {
        res.json({ message: 'Permissions Denied' })
    }
})

router.delete('/:id', getDriver, async (req, res) => {
    try {
        await res.driver.remove()
        res.json({ message: 'Deleted!' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getDriver(req, res, next) {
    let driver
    try {
        driver = await Driver.findById(req.params.id)
        if (driver == null) {
            return res.status(404).json({ message: 'Cannot find Driver' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    res.driver = driver
    next()
}

module.exports = router