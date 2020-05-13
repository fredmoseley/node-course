/*setTimeout(() => {
    console.log(`Two seconds are up`)
}, 2000);

const names = ['Andrew', 'Jen', 'Jess'];


const shortNames = names.filter((el) => el.length <= 4);
console.log(shortNames);
*/
/*
//returns undefined because geocode method finishes execution before the 
//setTimeout and returns undefined if we do not return a value.
const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        return data
    }, 2000)

}

const data = geocode('Philadelphia');
console.log(data);
*/


//Callbacks fix this problem
/*
const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        callback(data)
    }, 2000)

}

geocode('Philadelphia',(data)=>{
    console.log(data);
});
*/

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!



const add = (op1, op2, cb) => {
    setTimeout(() => {
        cb(op1 + op2);

    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})