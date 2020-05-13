//Object property shorthand

const name = 'Andrew'
const userAge = 27
//Object Property Shorthand
const user ={
    name,
    age: userAge,
    location: 'Philadelphia'
}

console.log(user)

//Object destructuring
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const label = product.label;
// const stock = prdouct.stock;

// const {label, stock, price} = product

// console.log(label);
// console.log(stock);
// console.log(price);

// //To use a name other than label
// //rating has a default value of 5 if it is undefined.
// //which it currently is.
// const {label: productLabel, rating=5} = product
// console.log(`productLabel:  ${productLabel}`);
// console.log(`rating: ${rating}`);

const transaction = (type, {label, stock}) => {
    console.log(type,label,stock)
}

transaction('order',product)