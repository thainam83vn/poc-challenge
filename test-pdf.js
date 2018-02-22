var pdfFillForm = require('pdf-fill-form');
var fs = require('fs');

const TEMPLATE_PATH = 'templates';
const OUTPUT_PATH = 'output';
 
pdfFillForm.write('test.pdf', { "myField": "myField fill value" }, { "save": "pdf", 'cores': 4, 'scale': 0.2, 'antialias': true } )
.then(function(result) {
    fs.writeFile("test123.pdf", result, function(err) {
        if(err) {
       		return console.log(err);
       	}
       	console.log("The file was saved!");
    }); 
}, function(err) {
  	console.log(err);
});