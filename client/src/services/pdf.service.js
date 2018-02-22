const SERVER_URL = "/api"
class PdfService {
    genTemplate({ templateName, address }) {
        let url = `${SERVER_URL}/pdf/${templateName}`;
        return fetch(url, {
            body: JSON.stringify({ address: address }),
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
        }).then(res => res.json);
    }
}

export default new PdfService();