export default function teste() {
    const https = require('https');
    
    const options = {
    method: 'GET',
    hostname: 'brapi.dev',
    path: '/api/available?search=TR&token=8QE9zJXLMnT7w6wppfyXEs',
    };
    
    const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log(data);
    });
    });
    
    req.end();
}