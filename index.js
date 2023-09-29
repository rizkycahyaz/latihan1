const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const ktpRouter = require('./routes/ktp');
const kartuKeluargaRouter = require('./routes/kartukeluarga');
const detailKkRouter = require('./routes/detailkk');

app.use('/api/ktp', ktpRouter);
app.use('/api/kartu-keluarga', kartuKeluargaRouter);
app.use('/api/detail-kk', detailKkRouter);

app.listen(port, () => {
  console.log(`aplikasi berjalan di http:localhost:${port}`);
});