//http using low level core modules
//developers usually use libraries like request, axios
const http = require('http');

let params = {
    access_key: 'e0ff01677e1d23deef6ff84c1d0a63f8',
    query: '45,-75',
    units: 'f',
    baseUrl: 'http://api.weatherstack.com/current'
}

const url = `http://api.weatherstack.com/current?access_key=${params.access_key}&query=${params.query}&units=${params.units}`


const request = http.request(url, (response) => {
    let data = ''
    //we may not have access to the entire response body
    //data comes in multiple chunks
    //we must listen to the data event and 
    response.on('data', (chunk) => {
        data += chunk.toString();
        console.log(chunk)
    })
    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body);
    });
});

request.on('error',(error)=>{
    console.log('An error', error)
})
request.end();

//Example of a chunk
/*
<Buffer 7b 22 72 65 71 75 65 73 74 22 3a 7b 22 74 79 70 65 22 3a 22 4c 61 74 4c 6f 6e 22 2c 22 71 75 65 72 79 22 3a 22 4c 61 74 20 34 35 2e 30 30 20 61 6e 64 ... 654 more bytes>
*/