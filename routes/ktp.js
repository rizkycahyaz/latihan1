const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

// Get all KTP
router.get('/', (req, res) => {
    connection.query('SELECT * FROM KTP', (err, rows) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        return res.status(200).json({ status: true, message: 'Data KTP', data: rows });
    });
});

router.get('/(:nik)', function (req, res) {
  let nik = req.params.nik;
  connection.query(`select * from  ktp where nik = ${nik}`, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'server error',
      })
  } 
    if (rows.length <= 0){
    return res.status(404).json({
      status: false,
      message: 'not Found',
      })
    }
    else {
      return res.status(200).json({
        status: true,
        message: 'Data mahasiswa',
        data: rows[0]
      })
    }
  })
})

router.post('/add',[
      body("nik").notEmpty(),
      body("nama_lengkap").notEmpty(),
      body("jenis_kelamin").notEmpty(),
      body("tempat_lahir").notEmpty(),
      body("tanggal_lahir").notEmpty(),
      body("agama").notEmpty(),
      body("pendidikan").notEmpty(),
      body("jenis_pekerjaan").notEmpty(),
      body("golongan_darah").notEmpty(),
      body("kewarganegaraan").notEmpty(),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
  
      const Data = {
        nik: req.body.nik,
        nama_lengkap: req.body.nama_lengkap,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        pendidikan: req.body.pendidikan,
        jenis_pekerjaan: req.body.jenis_pekerjaan,
        golongan_darah: req.body.golongan_darah,
        kewarganegaraan: req.body.kewarganegaraan,
      };
  
      connection.query("INSERT INTO ktp SET ?", Data, function (err, result) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Server error",
            error: err
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Data berhasil ditambahkan",
          });
        }
      });
    })

router.put('/update/:nik', [
    body('nama_lengkap').notEmpty(),
    body('jenis_kelamin').notEmpty(),
    body('tempat_lahir').notEmpty(),
    body('tanggal_lahir').notEmpty(),
    body('agama').notEmpty(),
    body('pendidikan').notEmpty(),
    body('jenis_pekerjaan').notEmpty(),
    body('golongan_darah').notEmpty(),
    body('kewarganegaraan').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const nik = req.params.nik;
    const data = {
        nama_lengkap: req.body.nama_lengkap,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        pendidikan: req.body.pendidikan,
        jenis_pekerjaan: req.body.jenis_pekerjaan,
        golongan_darah: req.body.golongan_darah,
        kewarganegaraan: req.body.kewarganegaraan,
    };

    connection.query('UPDATE KTP SET ? WHERE nik = ?', [data, nik], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        return res.status(200).json({ status: true, message: 'KTP has been updated!', data: result });
    });
});


router.delete('/delete/:nik', (req, res) => {
    const nik = req.params.nik;

    connection.query('DELETE FROM KTP WHERE nik = ?', nik, (err, result) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        return res.status(200).json({ status: true, message: 'KTP has been deleted!', data: result });
    });
});

module.exports = router;