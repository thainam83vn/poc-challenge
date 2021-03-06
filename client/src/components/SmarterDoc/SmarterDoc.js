import React from 'react';
import './SmarterDoc.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import pdfService from './../../services/pdf.service';
import dialogService from './../../services/dialog.service';
import FormField from './../Controls/FormField';
import Button from './../Controls/Button';
import UploadFile from './../Controls/UploadFile';
import { setLoading } from './../../actions/app-actions';


class SmarterDoc extends React.Component {
    state = {
        templates: [],
        selectedTemplate: null,
        form: null
    };

    componentDidMount() {
        this.getAllTemplates();
    }

    getAllTemplates() {
        this.props.setLoading(true);
        return pdfService.getUploadedTemplates().then(res => {
            this.setState({ templates: res.result });
            this.props.setLoading(false);
        }).catch(err => {
            dialogService.error(err);
            this.props.setLoading(false);                       
        });
    }

    setTemplate(t) {
        let form = {};
        t.fields.map(field => {
            form[field.name] = '';
        });
        this.setState({ selectedTemplate: t, form: form });
    }

    setFieldValue(field, value) {
        let form = this.state.form;
        form[field.name] = value;
        this.setState({ form: form });
    }

    generatePdf() {        
        if (this.state.selectedTemplate !== '') {
            this.props.setLoading(true);           
            let template = this.state.selectedTemplate;
            pdfService.genPdf({ templateFile: template.fileName, fields: this.state.form }).then(res => {
                this.setState({ outputUrl: res.outputUrl, binary: res.binary });
                let url = `/api/output/${res.outputUrl}`;
                pdfService.download({ url: url });
                this.props.setLoading(false);           
            }).catch(err => {
                console.log(err);
                this.props.setLoading(false);           
                dialogService.error(err);
            });
        } else {
            dialogService.alert('Invalid template', 'Please select template first');
        }
    }

    renderItems() {
        let selected = this.state.selectedTemplate;
        let items = this.state.templates.map(t =>
            <div key={t.fileName} className={selected && selected.fileName === t.fileName ? 'active' : ''} onClick={() => this.setTemplate(t)}>{t.fileName}</div>);
        return (
            <div className="templates">
                <div className='header'>Templates List</div>

                {items}
            </div>
        );
    }

    uploadedTemplate({ message, file }) {
        dialogService.alert('Uploaded template', 'Uploaded template sucessful').then(res => {
            this.getAllTemplates().then(res => {
                let selected = this.state.templates.filter(t => t.fileName == file);
                if (selected.length > 0)
                    this.setState({ selectedTemplate: selected[0] });
            });
        });
    }

    renderUpload() {
        return (
            <div className="upload" >
                <div className='header'>Upload Template</div>
                <div>
                    <UploadFile onUploaded={(res) => this.uploadedTemplate(res)} />
                </div>
            </div>
        );
    }

    renderForm() {
        if (this.state.form) {
            let selected = this.state.selectedTemplate;
            let fields = selected.fields.map(field =>
                <FormField key={field.name} value={this.state.form[field.name]} placeholder={field.name} onChange={(value) => this.setFieldValue(field, value)} />
            );
            return (
                <div className="form">
                    <h1>{selected && selected.fileName}</h1>
                    {fields}
                    <Button onClick={() => this.generatePdf()} title="Generate PDF" />
                </div>
            )
        }
        return <div className="form"></div>;
    }

    render() {
        let templates = this.renderItems();
        let upload = this.renderUpload();
        let form = this.renderForm();
        return (
            <div className="smarter-doc">
                <div className="right-side">
                    {templates}
                    {upload}
                </div>
                {form}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.app.isLoading
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ setLoading: setLoading }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SmarterDoc);