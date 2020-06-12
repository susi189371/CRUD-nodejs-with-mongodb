const mongoose = require('mongoose')

const dataKaryawanSchema = new mongoose.Schema({
    nama : {
        type:String,
        required: true
    },
    alamat:{
        type:String,
        required:true
    },
    telepon:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default: Date.now
    }
})


module.exports = mongoose.model('data_karyawan', dataKaryawanSchema)
