const express = require('express');
const router = express.Router();
const pdfService = require('./../services/pdf.service.server');

router.post('/:templateName', (req, res)=>{
    let templateName = req.params['templateName'] || '';
    let address = req.body.address;
    pdfService.generateAddress({templateName: templateName, address: address}).then(result=>{
        res.status(200).json({outputUrl: result});
    }).catch(err=>{
        res.status(500).json({error: err});
    });
});
module.exports = router;