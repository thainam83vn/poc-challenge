import React from 'react';
import './AddressGenerator.css';

export class AddressGenerator extends React.Component {
    state = {
        address: ''
    };

    generateAddress({templateName}){
        console.log("gen:", templateName, this.state.address);
    }

    render() {
        return (
            <div className="address-generator">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter address" onChange={(e)=>this.setState({address: e.target.value})} />
                </div>
                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <button type="button" className="btn btn-secondary" onClick={()=>this.generateAddress({templateName:"template1"})}>Generate smart_form_1.pdf</button>
                    <button type="button" className="btn btn-secondary" onClick={()=>this.generateAddress({templateName:"template2"})}>Generate smart_form_2.pdf</button>
                </div>
            </div>
        );
    }
}