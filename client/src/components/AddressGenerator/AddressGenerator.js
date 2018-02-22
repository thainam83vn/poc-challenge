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

    render() {
        return (
            <div className="address-generator">
                <h1>Smart Doc</h1>
                <FormField value={this.state.address} placeholder="Enter address" onChange={(value)=>this.setState({address:value})} />
                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <Button onClick={() => this.generateAddress({ templateName: "template1" })} title="Generate smart_form_1.pdf" />
                    <Button onClick={() => this.generateAddress({ templateName: "template2" })} title="Generate smart_form_2.pdf" />
                </div>
           
            </div>
        );
    }
}