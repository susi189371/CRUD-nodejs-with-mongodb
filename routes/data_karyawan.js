const express = require('express')
const router = express.Router()
const data_karyawan = require('../models/data_karyawan')
var numeral = require('numeral');

router.get('/', async (req, res) => {
    try {
        const dataKaryawan = await data_karyawan.find()
        res.json(dataKaryawan)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getDataKaryawan, (req, res) => {
    res.json(res.dataKaryawan)
})

router.post('/', async (req, res) => {
    const dataKaryawan = new data_karyawan({
        nama: req.body.nama,
        alamat: req.body.alamat,
        telepon: req.body.telepon
    })
    try {
        const newDataKaryawan = await dataKaryawan.save()
        res.status(201).json(newDataKaryawan)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch('/:id', getDataKaryawan, async (req, res) => {
    if (req.body.nama != null) {
        res.dataKaryawan.nama = req.body.nama
    }
    if (req.body.alamat != null) {
        res.dataKaryawan.alamat = req.body.alamat
    }
    if (req.body.telepon != null) {
        res.dataKaryawan.telepon = req.body.telepon
    }

    try {
        const updateDataKaryawan = await res.dataKaryawan.save()
        res.json(updateDataKaryawan)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', getDataKaryawan, async (req, res) => {
    try {
        await res.dataKaryawan.remove()
        res.json({ message: "data deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getDataKaryawan(req, res, next) {
    let dataKaryawan
    try {
        dataKaryawan = await data_karyawan.findById(req.params.id)
        if (dataKaryawan == null) {
            return res.status(404).json({ message: 'Cannot find data Karyawan' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.dataKaryawan = dataKaryawan
    next()
}

module.exports = router