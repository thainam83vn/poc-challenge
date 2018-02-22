const express = require('express');
const router = express.Router();
const pdfService = require('./../services/pdf.service.server');

router.post('/address/:templateName', (req, res)=>{
    let templateName = req.params['templateName'] || '';
    let address = req.body.address;
    pdfService.generateAddress({templateName: templateName, address: address}).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(500).json({error: err});
    });
});

router.post('/any/:templateFile', (req, res)=>{
    let templateFile = req.params['templateFile'];
    let fields = req.body.fields;
    pdfService.generateAny({templateFile: templateFile, data: fields}).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(500).json({error: err});
    });
});

router.post('/upload', (req, res)=>{
    console.log('upload', req.body);
    res.status(200).send({result:"ok"});
});

router.get('/uploadedTemplates', (req, res)=>{
    pdfService.getUploadedTemplates().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(500).json({error: err});
    });
});

router.get('/output/:fileName', (req, res)=>{
    console.log('output/:fileName');
    let fileName = req.params['fileName'];
    res.download(__dirname + '/public/output/' + fileName);
});
module.exports = router;