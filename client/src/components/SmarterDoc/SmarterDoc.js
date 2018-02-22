import React from 'react';
import './SmarterDoc.css';
import pdfService from './../../services/pdf.service';
import dialogService from './../../services/dialog.service';
import FormField from './../Controls/FormField';

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
                this.setState({ outputUrl: res.outputUrl, binary: res.binary })
            }).catch(err => {
                dialogService.err(err.message);
            });
        } else {
            dialogService.alert('Invalid address', 'Please input valid address');
        }
    }

    downloadOutput(e) {
        e.preventDefault();
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
       
    }

    render() {
        return (
            <div className="address-generator">
                <FormField value={this.state.address} placeholder="Enter address" onChange={(value)=>this.setState({address:value})} />
                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <button type="button" className="btn btn-secondary" onClick={() => this.generateAddress({ templateName: "template1" })}>Generate smart_form_1.pdf</button>
                    <button type="button" className="btn btn-secondary" onClick={() => this.generateAddress({ templateName: "template2" })}>Generate smart_form_2.pdf</button>
                </div>
                {this.state.binary &&
                    <div>
                        <a href='#' onClick={(e) => this.downloadOutput(e)} target='_blank'>Click here to download PDF output file</a>
                    </div>
                }
            </div>
        );
    }
}