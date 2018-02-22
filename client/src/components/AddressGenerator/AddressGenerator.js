import React from 'react';
import './AddressGenerator.css';
import pdfService from './../../services/pdf.service';
import dialogService from './../../services/dialog.service';
import FormField from './../Controls/FormField';
import Button from './../Controls/Button';

export class AddressGenerator extends React.Component {
    state = {
        address: '',
        outputUrl: null,
        binary: null
    };

    generateAddress({ templateName }) {
        console.log("gen:", templateName, this.state.address);
        if (this.state.address !== '') {
            pdfService.genTemplateAddress({ templateName: templateName, address: this.state.address }).then(res => {
                this.setState({ outputUrl: res.outputUrl, binary: res.binary });
                let url = `http://localhost:5000/api/output/${res.outputUrl}`;
                window.open(url, '_blank');
            }).catch(err => {
                console.log(err);
                dialogService.error(err);
            });
        } else {
            dialogService.alert('Invalid address', 'Please input valid address');
        }
    }

    downloadOutput(e) {
        e.preventDefault();
        // var blob = new Blob(this.state.binary.data, { type: "application/pdf" });
        // var url = URL.createObjectURL(blob);
        // var a = document.createElement("a");
        // document.body.appendChild(a);
        // a.style = "display: none";
        // a.href = url;
        // a.download = 'output.pdf';
        // a.target = '_blank';
        // a.click();

        let url = `/api/output/${this.state.outputUrl}`;
        fetch(url).then(response => {
            const reader = response.body.getReader();
            const stream = new ReadableStream({
                start(controller) {
                    // The following function handles each data chunk
                    function push() {
                        // "done" is a Boolean and value a "Uint8Array"
                        return reader.read().then(({ done, value }) => {
                            // Is there no more data to read?
                            if (done) {
                                // Tell the browser that we have finished sending data
                                controller.close();
                                return;
                            }

                            // Get the data and send it to the browser via the controller
                            controller.enqueue(value);
                        }).then(push);
                    };

                    push();
                }
            });

            return new Response(stream, { headers: { "Content-Type": "application/pdf" } });
        });
        // .then(res => {
        // var blob = new Blob([res.body], { type: "application/pdf" });

        // var url = URL.createObjectURL(blob);
        // // window.open(url);
        // var a = document.createElement("a");
        // document.body.appendChild(a);
        // a.style = "display: none";
        // a.href = url;
        // a.download = 'output.pdf';
        // a.target = '_blank';
        // a.click();
        // });

        // e.preventDefault();
        // var blob = new Blob(this.state.binary.data, {type: "application/pdf"});
        // var objectUrl = URL.createObjectURL(blob);
        // window.open(objectUrl);
        // let blob = this.state.binary.data;        
        // if (navigator.appVersion.toString().indexOf('.NET') > 0) {
        //     window.navigator.msSaveBlob(blob, 'output.pdf'); // for IE browser
        //   } else {
        //     var url = URL.createObjectURL(blob);
        //     var a = document.createElement("a");
        //     document.body.appendChild(a);
        //     a.style = "display: none";
        //     a.href = url;
        //     a.download = 'output.pdf';
        //     a.target = '_blank';
        //     a.click();
        //   }
    }

    render() {
        return (
            <div className="address-generator">
                <h1>Smart Doc</h1>
                <FormField value={this.state.address} placeholder="Enter address" onChange={(value)=>this.setState({address:value})} />
                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <Button onClick={() => this.generateAddress({ templateName: "template1" })} title="Generate smart_form_1.pdf" />
                    <Button onClick={() => this.generateAddress({ templateName: "template2" })} title="Generate smart_form_2.pdf" />
                    {/* <button type="button" className="btn btn-secondary" onClick={() => this.generateAddress({ templateName: "template1" })}>Generate smart_form_1.pdf</button>
                    <button type="button" className="btn btn-secondary" onClick={() => this.generateAddress({ templateName: "template2" })}>Generate smart_form_2.pdf</button> */}
                </div>
           
            </div>
        );
    }
}