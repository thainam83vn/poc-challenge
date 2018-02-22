const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const pdfAddressCtrl = require('./controllers/pdf.controller');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api', (req, res) => {
  res.send({ express: 'API is working' });
});

const storage = multer.diskStorage({
  destination: './upload-templates',
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), function(req,res){
	res.status(204).end();
});

app.get('/api/output/:fileName', (req, res) => {
  let fileName = req.params.fileName;
  res.download(`${__dirname}/public/output/${fileName}`);
});

app.use('/api/pdf', pdfAddressCtrl);


app.listen(port, () => console.log(`Listening on port ${port}`));