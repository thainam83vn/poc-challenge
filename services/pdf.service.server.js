var uuid = require('uuid');
var pdfFillForm = require('pdf-fill-form');
var fs = require('fs');

const TEMPLATE_PATH = 'templates';
const OUTPUT_PATH = 'public/output';

let service = {};

service.scanFields = ({templateFile})=>{
    return new Promise((resolve, reject)=>{
        pdfFillForm.read(templateFile)
        .then(function (result) {
            resolve(result);
        }, function (err) {
            reject(err);
        });
    
    });
}

service.generate = ({templateFile, data, outputFile})=>{
    return new Promise((resolve, reject)=>{
        pdfFillForm.write(`${templateFile}`, data, { "save": "pdf" } )
        .then(function(result) {
            let outputPath = `${OUTPUT_PATH}/${outputFile}`;
            fs.writeFile(outputPath, result, function(err) {
                if(err) {
                    reject(err);
                }
                let outputUrl = `${outputFile}`;
                
                resolve({outputUrl:outputUrl, binary: result});
            }); 
        }, function(err) {
            reject(err);
        });    
    });
}

service.generateAddress = ({templateName, address})=>{
    let templateFile = "";
    switch(templateName){
        case "template1":
            templateFile = "templates/smart_pdf_1.pdf";
            break;
        case "template2":
            templateFile = "templates/smart_pdf_2.pdf";
            break;            
    }

    let outputFile = `${templateName}_${uuid()}.pdf`;
    return service.generate({templateFile: templateFile, data: {address: address}, outputFile: outputFile});
};
 
module.exports = service;
