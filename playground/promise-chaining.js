const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

//bad because more complex and nested as we make more calls to add
// add(1, 2)
//   .then((sum) => {
//     console.log(sum);
//     add(sum, 5)
//       .then((sum2) => console.log(sum2))
//       .catch((err) => console.log(err));
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//promise chaining
//you can return a promise from a then callback allowing you to add a then chain
add(1, 1)
  .then((sum) => {
    console.log(sum);
    //return a promise
    return add(sum, 4);
  })
  .then((sum2) => console.log(sum2))
  .catch((err) => console.log(err));
