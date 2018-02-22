const express = require('express');
const bodyParser = require('body-parser');
const pdfAddressCtrl = require('./controllers/pdf.controller');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.send({ express: 'API is working' });
});

app.use('/api/pdf', pdfAddressCtrl);


app.listen(port, () => console.log(`Listening on port ${port}`));