const fs = require('fs');
// // const book = {
// //     title: 'Ego is the Enemy',
// //     author: 'Ryan Holiday'
// // }

// // const bookJSON = JSON.stringify(book);
// // fs.writeFileSync('1-json.json',bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json');  //returns a buffer.  The way node 
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON);
// console.log(data.title);

const dataBuffer = fs.readFileSync('1-json.json');
const data = JSON.parse(dataBuffer.toString());
data.name = 'Fred';
data.age = 21;
const jsonString = JSON.stringify(data);
fs.writeFileSync('1-json.json', jsonString);
fs.w