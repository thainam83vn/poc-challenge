import React from 'react';
import './AddressGenerator.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import pdfService from './../../services/pdf.service';
import dialogService from './../../services/dialog.service';
import FormField from './../Controls/FormField';
import Button from './../Controls/Button';
import { setLoading } from './../../actions/app-actions';


class AddressGenerator extends React.Component {
    state = {
        address: '',
        outputUrl: null,
    };

    downloadOutput(e) {
        let url = `/api/output/${this.state.outputUrl}`;
        fetch(url).then(function (response) {
            return response.blob();
        }).then(function (myBlob) {
            var objectURL = URL.createObjectURL(myBlob);
            window.open(objectURL, '_blank');
        });
    }

    generateAddress({ templateName }) {
        console.log("gen:", templateName, this.state.address);
        this.props.setLoading(true);
        if (this.state.address !== '') {
            pdfService.genTemplateAddress({ templateName: templateName, address: this.state.address }).then(res => {
                this.setState({ outputUrl: res.outputUrl });
                // this.downloadOutput();
                let url = `/api/output/${this.state.outputUrl}`;
                pdfService.download({ url: url });
                this.props.setLoading(false);
            }).catch(err => {
                console.log(err);
                dialogService.error(err);
                this.props.setLoading(false);                
            });
        } else {
            this.props.setLoading(false);            
            dialogService.alert('Invalid address', 'Please input valid address');
        }
    }

    render() {
        return (
            <div className="address-generator">
                <h1>Smart Doc</h1>
                <FormField value={this.state.address} placeholder="Enter address" onChange={(value) => this.setState({ address: value })} />
                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <Button onClick={() => this.generateAddress({ templateName: "template1" })} title="Generate smart_form_1.pdf" />
                    <Button onClick={() => this.generateAddress({ templateName: "template2" })} title="Generate smart_form_2.pdf" />
                </div>

            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        isLoading: state.app.isLoading
    }
  }
  function matchDispatchToProps(dispatch){
    return bindActionCreators({setLoading: setLoading}, dispatch);
  }
  
  export default  connect(mapStateToProps, matchDispatchToProps)(AddressGenerator);