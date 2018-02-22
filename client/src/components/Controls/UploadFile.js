import React from 'react';
import axios from 'axios';

class UploadFile extends React.Component {
    inputFile = null;

    uploadRequest({ file, name }) {
        let data = new FormData();
        data.append('file', file);
        data.append('name', name);
        axios.post('/api/upload', data)
            .then(response => {
                console.log(response);
                this.inputFile.value = null;
                if (this.props.onUploaded)
                    this.props.onUploaded({message:"uploaded", file: name})
            })
            .catch(error =>  console.log(error));
    }

    handleFileUpload(e) {
        let files = e.target.files;
        console.log('files:', files);
        const file = files[0];        
        this.uploadRequest({
           file,
           name: file.name
        })
      }

    render() {
        return (
            <input ref={inputFile => this.inputFile = inputFile} type="file" onChange={e=>this.handleFileUpload(e)} />
        );
    }
}
export default UploadFile;