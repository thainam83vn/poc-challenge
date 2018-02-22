const express = require('express');
const router = express.Router();

router.post('/:templateName', (req, res)=>{
    let templateName = req.params['templateName'] || '';
    let address = req.body.address;
    res.status(200).json({result: `${templateName}: ${address}`});
});
module.exports = router;