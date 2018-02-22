const SERVER_URL = "/api"
class PdfService {    
    genTemplateAddress({ templateName, address }) {
        let url = `${SERVER_URL}/pdf/address/${templateName}`;
        return fetch(url, {
            body: JSON.stringify({ address: address }),
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
        }).then(res => res.json());
    }

    getUploadedTemplates() {
        let url = `${SERVER_URL}/pdf/uploadedTemplates`;
        return fetch(url, {
            method: 'GET',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
        }).then(res => res.json());
    }

    genPdf({ templateFile, fields }) {
        let url = `${SERVER_URL}/pdf/any/${templateFile}`;
        return fetch(url, {
            body: JSON.stringify({ fields: fields }),
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
        }).then(res => res.json());
    }

}

export default new PdfService();